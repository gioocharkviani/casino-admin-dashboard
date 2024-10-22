import React, { forwardRef, TextareaHTMLAttributes } from 'react';

// Extend TextareaHTMLAttributes to include additional props
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | any; // Accept string or any type for error messages
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {label && (
          <label
            htmlFor={props.id}
            className={`block text-sm font-medium mb-1 transition-all ${
              error ? 'text-red-500' : 'text-gray-700 dark:text-[#e9e9e9]'
            }`}
          >
            {label}
          </label>
        )}
        <textarea
          id={props.id}
          ref={ref} // Forward the ref to the textarea element
          {...props}
          className={`w-full px-3 py-2 min-h-[100px] border dark:bg-transparent dark:text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : ''
          }`}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

// Adding displayName for easier debugging
Textarea.displayName = 'Textarea';

export default Textarea;
