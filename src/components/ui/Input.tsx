import React from "react";

interface InputProps {
  type: string;
  label?: string | null;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  min?: number;
  max?: number;
}

const Input: React.FC<InputProps> = ({ min, max, type, label, placeholder, value, onChange, error }) => {
  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={label || undefined}
          className={`block text-sm font-medium mb-1 transition-all 
                    ${error ? "text-red-500" : "text-gray-700 dark:text-[#e9e9e9]"}`}
        >
          {label}
        </label>
      )}
      <input
        id={label || undefined}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className={`w-full px-3 py-2 border dark:bg-transparent dark:text-white dark:text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
