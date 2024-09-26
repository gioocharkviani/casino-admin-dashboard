'use client';
import React, { useState } from 'react';
import Input from './Input';
import Checkbox1 from './Checkbox1';

interface Option {
  value: string;
}

interface SelectProps {
  options: Option[];
  search?: boolean;
  select?: boolean;
  label?: string;
  selectedValue?: string;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  selectedValue,
  onChange,
  label,
  search,
  select,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.find((option) => option.value === selectedValue) || null
  );

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <span className="block text-sm font-medium transition-all ">{label}</span>

      <div
        className={`w-full  px-3 py-2 text-sm mt-1 flex border items-center ${
          isOpen ? 'border-indigo-500 border' : ''
        } justify-between border-1 border-gray-300 dark:bg-transparent  bg-white rounded-md shadow-sm cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-900 text-sm dark:text-white">
          {selectedOption ? selectedOption.value : 'Select an option'}
        </span>

        <div
          className={`w-2 h-2 border-l-2  dark:border-white border-darkBlue text-sm border-b-2 transform ${
            isOpen ? '-rotate-45' : 'rotate-135'
          } transition-transform`}
        ></div>
      </div>

      {isOpen && (
        <div className="absolute max-h-[300px] overflow-y-auto left-0 top-full text-sm mt-2 w-full border dark:text-black border-gray-300 dark:border-darkBg rounded-md overflow-hidden shadow-lg bg-white dark:bg-gray-800 z-10 pb-2">
          {(search || select) && (
            <div className="flex justify-between p-2 items-center gap-2">
              {select && <Checkbox1 id="1" label="select all" />}
              {search && <Input type="text" placeholder="find user" />}
            </div>
          )}

          {options.map((option) => (
            <div
              key={option?.value}
              className={`px-4 py-2 cursor-pointer dark:text-white capitalize dark:hover:bg-darkBg hover:bg-gray-100 ${
                selectedOption?.value === option.value
                  ? 'bg-gray-200 dark:bg-darkBg'
                  : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
