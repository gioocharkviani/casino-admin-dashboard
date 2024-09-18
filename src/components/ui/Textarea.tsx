import React from 'react'

interface InputProps {
    label?: string | null;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string | null;
}


const Textarea = ({error , label}:InputProps) => {
  return (
    <div className="relative w-full">
            {label && (
                <label 
                    htmlFor=''
                    className={`block text-sm font-medium transition-all mb-1 
                    ${error ? 'text-red-500' : 'text-gray-700 dark:text-[#e9e9e9]'}`}
                >
                    {label}
                </label>
            )}
        <textarea
            id='textarea'
            className={`w-full  px-3 py-2 text-sm outline-none min-h-52 rounded-md border shadow-sm  text-gray-900 transition-colors border-gray-300 focus:border-1  focus:border-indigo-500 ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
    </div>
  )
}

export default Textarea