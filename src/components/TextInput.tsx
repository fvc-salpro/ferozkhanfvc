import React from "react";

interface TextInputProps {
  label: string;
  name: string;
  type?: string | 'text';
  value?: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  type,
  value,
  required,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        className="w-full p-2 border rounded-md"
      />
    </div>
  );
};

export default TextInput;
