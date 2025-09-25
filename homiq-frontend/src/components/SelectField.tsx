import React from "react";
import type { SelectFieldProps } from "../models/components";

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="w-32">
      {label && (
        <label className="block text-sm font-medium text-[#696969] text-left mb-1">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className={`block w-full text-[#696969] border rounded-md p-2  focus:ring-2 focus:outline-none ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-yellow-500"
        }`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#322C1B] text-white">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default SelectField;
