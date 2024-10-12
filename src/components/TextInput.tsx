import React from "react";

interface TextInputProps {
  label: string;
  name: string;
  type?: string | 'text';
  value?: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  type,
  value,
  required,
  onChange,
  className,
}) => {
  return (
    <div className="w-full">
      <label className="block text-gray-primary mb-2 text-b14" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        className={`w-full p-2 border rounded-md outline-none text-b14 ${className}`}
      />
    </div>
  );
};

export default TextInput;
