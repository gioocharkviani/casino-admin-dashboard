"use client"
import React, { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  label?:string;
  selectedValue?: string;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ options, selectedValue, onChange ,label}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.find(option => option.value === selectedValue) || null
  );

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">

        <span className='block text-sm font-medium transition-all '>
            {label}
        </span>

      <div
        className={`w-full  px-3 py-2 text-sm mt-1 flex border items-center ${isOpen? 'border-indigo-500 border' : ''} justify-between border-1 border-gray-300 bg-white rounded-md shadow-sm cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-900 text-sm">
          {selectedOption ? selectedOption.label : 'Select an option'}
        </span>

        <div className={`w-2 h-2 border-l-2 border-darkBlue text-sm border-b-2 transform ${isOpen ? '-rotate-45' : 'rotate-135'} transition-transform`}></div>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full text-sm mt-2 w-full border dark:text-black border-gray-300 rounded-md overflow-hidden shadow-lg bg-white z-10">
          {options.map(option => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedOption?.value === option.value ? 'bg-gray-200' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
