import React from "react";

interface FileUploadInputProps {
  label: string;
  name: string;
  required?: boolean | false;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({
  label,
  name,
  required,
  onChange,
}) => {
  return (
    <div className="mb-6 flex items-start justify-center w-full flex-col gap-[4px]">
      <p className="text-b14 text-gray-primary">{label}</p>
      <label
        htmlFor={name}
        className="flex flex-col text-dark-primary text-b16 items-center p-[8px] justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-primary/10 hover:bg-gray-primary/5 duration-300 ease-in-out"
      >
        <div className="flex flex-col items-center justify-center">
          <svg
            className="w-8 h-8 m-2 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-b14 text-center text-balance">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
        </div>
        <input
          id={name}
          type="file"
          required={required}
          name={name}
          onChange={onChange}
          className="inset-0 opacity-0 cursor-pointer"
        />
      </label>
    </div>
  );
};

export default FileUploadInput;
