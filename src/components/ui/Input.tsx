import React, { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  name?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, name, ...props }, ref) => {
  return (
    <div className="relative w-full flex flex-col justify-start items-start">
      {label && (
        <label
          htmlFor={name}
          className={`block text-sm font-medium mb-1 transition-all ${
            error ? "text-red-500" : "text-gray-700 dark:text-[#e9e9e9]"
          }`}
        >
          {label}
        </label>
      )}
      <input
        id={name}
        ref={ref}
        name={name}
        {...props}
        className={`w-full px-3 py-2 border dark:bg-transparent dark:text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
          error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
