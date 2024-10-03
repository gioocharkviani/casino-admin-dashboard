import React from 'react';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | null;
  name?: string;
  error?: string | null;
}

const Textarea: React.FC<TextareaProps> = ({ error, label, name, ...rest }) => {
  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={name}
          className={`block text-sm font-medium transition-all mb-1 
                    ${
                      error
                        ? 'text-red-500'
                        : 'text-gray-700 dark:text-[#e9e9e9]'
                    }`}
        >
          {label}
        </label>
      )}
      <textarea
        id={name}
        {...rest} // Spread the rest of the props here
        className={`w-full px-3 py-2 text-sm outline-none min-h-52 rounded-md border shadow-sm text-gray-900 transition-colors border-gray-300 dark:text-white dark:bg-transparent focus:border-1 focus:border-indigo-500 ${
          error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Textarea;
