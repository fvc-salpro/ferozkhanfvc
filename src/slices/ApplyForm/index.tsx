"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import TextInput from "../../components/TextInput";
import FileUploadInput from "../../components/FileUploadInput";
import { useState } from "react";
import { Bounded } from "@/components/Bounded";

export type ApplyFormProps = SliceComponentProps<Content.ApplyFormSlice>;

const ApplyForm = ({ slice }: ApplyFormProps): JSX.Element => {
  const [formValues, setFormValues] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    country: string;
    visaType: string;
    files: { [key: string]: File | undefined };
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    visaType: "",
    files: {},
  });

  const [messages, setMessages] = useState<{
    general: string;
    fileErrors?: { [key: string]: string };
  }>({
    general: "",
    fileErrors: {},
  });

  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
          fileErrors: { ...prev.fileErrors, [name]: "File size must not exceed 2MB." },
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
    
    if (!formValues.firstName || !formValues.email || !formValues.country || !formValues.visaType) {
      setMessages((prev) => ({
        ...prev,
        general: "Please fill in all required fields.",
      }));
      return;
    }

    // Check for file size limits (2MB)
    const fileSizeLimit = 2 * 1024 * 1024;
    const oversizedFiles = Object.values(formValues.files).filter(file => file && file.size > fileSizeLimit);

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

    const response = await fetch('/api/upload-doc', {
      method: 'POST',
      body: formData,
    });

    setIsLoading(false);

    if (response.ok) {
      setMessages({ general: "Application submitted successfully!" });
      setFormValues({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        country: "",
        visaType: "",
        files: {},
      });
    } else {
      setMessages({ general: "Failed to submit the application. Please try again." });
    }
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="p-8 bg-white shadow-md rounded-md"
    >
      <Bounded as="div" className="bg-white md:px-[32px] px-[24px]">
        <h2 className="text-2xl mb-6">{slice.primary.header}</h2>

        {/* Instructions */}
        <div className="mb-6 p-4 bg-yellow-100 rounded-md border border-yellow-300 text-yellow-900">
          <p>
            Please upload each document separately as a clear PDF scan. Ensure
            that all documents are scanned using a scanner and not a mobile
            phone. The maximum allowed file size for each document is 2MB.
          </p>
        </div>

        {/* General Message */}
        {messages.general && (
          <div className="mb-4 p-2 bg-red-100 text-blue-700 rounded-md">
            {messages.general}
          </div>
        )}

        {/* Input Fields */}
        <form onSubmit={handleSubmit}>
          <TextInput
            label="First Name"
            name="firstName"
            value={formValues.firstName}
            onChange={handleInputChange}
            required={true}
          />

          <TextInput
            label="Last Name"
            name="lastName"
            value={formValues.lastName}
            onChange={handleInputChange}
          />

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

          <TextInput
            label="Country"
            name="country"
            value={formValues.country}
            onChange={handleInputChange}
            required={true}
          />

          <TextInput
            label="Visa Type"
            name="visaType"
            value={formValues.visaType}
            onChange={handleInputChange}
            required={true}
          />

          {/* File Upload Fields */}
          {[  
            {
              label: "Passport",
              required: true,
            },
            {
              label: "CNIC",
              required: true,
            },
            {
              label: "White Background Photo",
              required: true,
            },
            {
              label: "CV",
              required: false,
            },
            {
              label: "HSSC Certificate",
              required: false,
            },
            {
              label: "HSSC DMC",
              required: false,
            },
            {
              label: "Matric Certificate",
              required: false,
            },
            {
              label: "Matric DMC",
              required: false,
            },
            {
              label: "Recommendation Letter 1",
              required: false,
            },
            {
              label: "Recommendation Letter 2",
              required: false,
            },
            {
              label: "English Proficiency Certificate",
              required: false,
            },
            {
              label: "English Test Certificate",
              required: false,
            },
            {
              label: "Work Experience Certificate",
              required: false,
            },
            {
              label: "Other Documents",
              required: false,
            },
          ].map((doc, index) => {
            const fileName = doc.label.toLowerCase().replace(/\s+/g, "-");
            return (
              <div key={index}>
                <FileUploadInput
                  label={doc.label}
                  name={fileName}
                  required={doc.required}
                  onChange={handleFileChange}
                />
                {messages.fileErrors && messages.fileErrors[fileName] && (
                  <div className="mt-1 mb-2 text-red-600">
                    {messages.fileErrors[fileName]}
                  </div>
                )}
              </div>
            );
          })}

          <button
            type="submit"
            className="mt-6 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark relative"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                {/* Loading Spinner */}
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
      </Bounded>
    </section>
  );
};

export default ApplyForm;