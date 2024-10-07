import React from "react";

interface FileUploadInputProps {
  label: string;
  name: string;
  required?: boolean | false;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({ label, name, required, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        type="file"
        id={name}
        required={required}
        name={name}
        onChange={onChange}
        className="w-full p-2 border rounded-md"
      />
    </div>
  );
};

export default FileUploadInput;
