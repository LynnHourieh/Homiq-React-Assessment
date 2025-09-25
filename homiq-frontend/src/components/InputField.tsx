/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { InputFieldProps } from "../models/components";


const InputField: React.FC<InputFieldProps<any>> = ({
  label,
  type = "text",
  placeholder,
  error,
  register,
  name,
  value,
  onChange,
  className,
  labelClassName
}) => {
  return (
    <div>
      <label className={`block text-sm font-medium  text-left ${labelClassName}`}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...(register ? register(name) : {})}
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full border rounded-md p-2 focus:outline-none ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        } ${className}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default InputField;
