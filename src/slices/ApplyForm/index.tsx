"use client";

import { Content } from "@prismicio/client";
import { JSXMapSerializer, SliceComponentProps } from "@prismicio/react";
import TextInput from "../../components/TextInput";
import FileUploadInput from "../../components/FileUploadInput";
import { useState } from "react";
import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";
import SelectInput from "@/components/SelectInput";

export type ApplyFormProps = SliceComponentProps<Content.ApplyFormSlice>;

const components: JSXMapSerializer = {
  em: ({ children }) => (
    <em className="text-b14 text-gray-primary italic">{children}</em>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  paragraph: ({ children }) => (
    <p className="mb-7 last:mb-0 text-b14 text-gray-primary">{children}</p>
  ),
};

const ApplyForm = ({ slice }: ApplyFormProps): JSX.Element => {
  const documentRequirements = {
    "student-visa": {
      required: [
        "CV",
        "CNIC",
        "Passport",
        "Latest Education DMC/Transcript",
        "Latest Education Certificate/Degree",
        "English Proficiency Certificate OR English Test",
      ],
      optional: [
        "Work Experience Certificate",
      ],
    },
    "visit-visa": {
      required: [
        "CV",
        "CNIC",
        "Passport",
        "Latest Education DMC/Transcript",
        "Latest Education Certificate/Degree",
        "English Proficiency Certificate OR English Test",
      ],
      optional: [
        "Travel History - Visa Stickers",
        "Travel History - Refusal Letters",
      ],
    },
    "work-permit": {
      required: [
        "CV",
        "CNIC",
        "Passport",
        "Latest Education DMC/Transcript",
        "Latest Education Certificate/Degree",
        "English Proficiency Certificate OR English Test",
      ],
      optional: [
        "Work Experience Certificate",
      ],
    },
  };

  const [formValues, setFormValues] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    country: string;
    visaType: string;
    university: string;
    message: string;
    files: { [key: string]: File | undefined };
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    visaType: "",
    university: "",
    message: "",
    files: {},
  });

  const [messages, setMessages] = useState<{
    general: string;
    fileErrors?: { [key: string]: string };
  }>({
    general: "",
    fileErrors: {},
  });

  const selectedDocuments = documentRequirements[formValues.visaType] || {
    required: [],
    optional: [],
  };

  const [isLoading, setIsLoading] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);

  const handleCheckboxChange = () => {
    setCheckboxChecked(!checkboxChecked);
    setCheckboxError(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMessages((prev) => ({
      ...prev,
      general: "",
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setMessages((prev) => ({
          ...prev,
          fileErrors: {
            ...prev.fileErrors,
            [name]: "File size must not exceed 2MB.",
          },
        }));
      } else {
        setMessages((prev) => ({
          ...prev,
          fileErrors: { ...prev.fileErrors, [name]: "" },
        }));
      }

      setFormValues((prev) => ({
        ...prev,
        files: { ...prev.files, [name]: file },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkboxChecked) {
      setMessages((prev) => ({
        ...prev,
        general: "Please acknowledge the Check.",
      }));
      return;
    }

    if (
      !formValues.firstName ||
      !formValues.email ||
      !formValues.country ||
      !formValues.visaType
    ) {
      setMessages((prev) => ({
        ...prev,
        general: "Please fill in all required fields.",
      }));
      return;
    }

    const fileSizeLimit = 2 * 1024 * 1024;
    const oversizedFiles = Object.values(formValues.files).filter(
      (file) => file && file.size > fileSizeLimit
    );

    if (oversizedFiles.length > 0) {
      setMessages((prev) => ({
        ...prev,
        general: "One or more files exceed the 2MB size limit.",
      }));
      return;
    }

    const formData = new FormData();
    for (const key in formValues) {
      if (key !== "files") {
        formData.append(key, formValues[key as keyof typeof formValues]);
      }
    }
    for (const key in formValues.files) {
      if (formValues.files[key]) {
        formData.append(key, formValues.files[key]);
      }
    }

    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    try {
      const response = await fetch("/api/upload-doc", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        setMessages({
          general:
            "Application submitted successfully! You will receive an email shortly.",
        });
        setFormValues({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          country: "",
          visaType: "",
          university: "",
          message: "",
          files: {},
        });
      } else {
        const data = await response.json();
        setMessages({
          general: `${data.error} (Status: ${data.status})`,
        });
      }
    } catch (error) {
      if (error?.name === "AbortError") {
        setMessages({
          general:
            "The request timed out. Please try re-submitting the form, and consider reducing the file sizes.",
        });
      } else {
        setMessages({
          general:
            "An error occurred while submitting the application. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white"
      id="apply-now"
    >
      {isLoading && (
        <div className="fixed inset-0 bg-primary/80 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center animate-fade-in">
            {/* Spinner */}
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-b-transparent border-l-white border-r-primary animate-spin"></div>
            </div>

            {/* Glowing text */}
            <p className="mt-6 px-4 text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-white tracking-wide animate-pulse">
              Submitting your application, please wait...
            </p>

            {/* Optional: Animated gradient bar */}
            <div className="mt-4 w-48 sm:w-64 h-2 bg-gradient-to-r from-white via-primary to-primary-light rounded-full overflow-hidden">
              <div className="w-16 h-2 bg-primary-light rounded-full animate-slide-in"></div>
            </div>
          </div>
        </div>
      )}


      <Bounded
        as="div"
        yPadding="base"
        className="bg-white md:px-[32px] px-[24px]"
      >
        <h2 className="text-2xl mb-6 text-center">{slice.primary.header}</h2>
        <div className="flex flex-col gap-[30px] justify-center items-center">
          {messages.general && (
            <div className="mb-4 p-2 bg-primary/80 text-dark rounded-md text-center">
              {messages.general}
            </div>
          )}
          <form
            className="flex w-full flex-col gap-[14px] max-w-[620px]"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-row gap-[24px] w-full">
              <TextInput
                label="First Name"
                name="firstName"
                value={formValues.firstName}
                onChange={handleInputChange}
                required={true}
                className="w-full"
              />
              <TextInput
                label="Last Name"
                name="lastName"
                value={formValues.lastName}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>

            <div className="flex flex-row gap-[24px] w-full">
              <TextInput
                label="Email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleInputChange}
                required={true}
              />
              <TextInput
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                value={formValues.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-row gap-[24px] w-full">
              <TextInput
                label="Desired Country"
                name="country"
                value={formValues.country}
                onChange={handleInputChange}
                required={true}
              />
              <SelectInput
                label="Visa Type"
                name="visaType"
                value={formValues.visaType}
                onChange={handleInputChange}
                options={[
                  { value: "student-visa", label: "Student Visa" },
                  { value: "visit-visa", label: "Visit Visa" },
                  { value: "work-permit", label: "Work Permit" },
                ]}
              />
            </div>
            {formValues.visaType == "student-visa" && (
              <div className="flex flex-row gap-[24px] w-full">
                <TextInput
                  label="Desired University"
                  name="university"
                  value={formValues.university}
                  onChange={handleInputChange}
                  required={false}
                />
              </div>
            )}

            <div className="flex flex-col w-full">
              <label className="block text-gray-primary mb-2 text-b14">
                Message
              </label>
              <textarea
                name="message"
                value={formValues.message}
                onChange={handleInputChange}
                required={false}
                rows={4}
                className="w-full p-2 border rounded-md outline-none text-b14 min-h-[100px]"
              />
            </div>

            {/* Conditionally Render File Uploads */}
            <h3 className="mt-4 font-bold">Required Documents</h3>
            <div className="grid grid-cols-2 gap-x-[30px]">
              {selectedDocuments.required.map((doc, index) => {
                const fileName = doc.toLowerCase().replace(/\s+/g, "-"); // Unique fileName for each document
                return (
                  <div key={index}>
                    <FileUploadInput
                      label={doc}
                      name={fileName}
                      required={true}
                      onChange={handleFileChange}
                    />
                    {formValues.files[fileName] && (
                      <div className="mb-2 text-primary">
                        {formValues.files[fileName].name}
                      </div>
                    )}
                    {messages.fileErrors && messages.fileErrors[fileName] && (
                      <div className="mt-1 mb-2 text-red-600">
                        {messages.fileErrors[fileName]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <h3 className="mt-4 font-bold">Optional Documents</h3>
            <div className="grid grid-cols-2 gap-x-[30px]">
              {selectedDocuments.optional.map((doc, index) => {
                const fileName = doc.toLowerCase().replace(/\s+/g, "-"); // Unique fileName for each document
                return (
                  <div key={index}>
                    <FileUploadInput
                      label={doc}
                      name={fileName}
                      required={false}
                      onChange={handleFileChange}
                    />
                    {formValues.files[fileName] && (
                      <div className="mb-2 text-primary">
                        {formValues.files[fileName].name}
                      </div>
                    )}
                    {messages.fileErrors && messages.fileErrors[fileName] && (
                      <div className="mt-1 mb-2 text-red-600">
                        {messages.fileErrors[fileName]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="w-full mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkboxChecked}
                  onChange={handleCheckboxChange}
                  className="w-[32px] h-[32px]"
                  required
                />
                <PrismicRichText
                  components={components}
                  field={slice.primary.form_instructions}
                />
              </label>
            </div>

            <button
              type="submit"
              className="relative inline-flex h-fitrounded-[8px] text-b16 font-normal border bg-gradient-to-r from-primary to-primary-dark hover:shadow-md 
              duration-300 ease-in-out px-[32px] py-[12px] text-white outline-none transition-colors after:absolute after:inset-0 after:-z-10 
              after:animate-pulse after:rounded-full after:bg-primary/60 after:bg-opacity-0 after:blur-md after:transition-all after:duration-500 
              hover:border-primary hover:text-white border-none w-full rounded-[8px] items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 0116 0 8 8 0 11-16 0z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Apply Now"
              )}
            </button>
          </form>
        </div>
      </Bounded>
    </section>
  );
};

export default ApplyForm;
