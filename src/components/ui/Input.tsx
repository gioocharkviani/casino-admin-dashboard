import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label?: string | null;
  name?: string;
  error?: string | null;
}

const Input: React.FC<InputProps> = ({
  min,
  max,
  type,
  label,
  placeholder,
  name,
  error,
  ...rest // Capture any other props
}) => {
  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={name}
          className={`block text-sm font-medium mb-1 transition-all 
                    ${
                      error
                        ? 'text-red-500'
                        : 'text-gray-700 dark:text-[#e9e9e9]'
                    }`}
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
        {...rest} // Spread the rest of the props here
        className={`w-full px-3 py-2 border dark:bg-transparent dark:text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                ${
                  error
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : ''
                }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
