import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  label?: string | null;
  name?: string;
  options: Option[];
  error?: string | null;
  placeholder?: string;
  onChange: (value: string | number) => void;
  resetSelect?: boolean;
  defaultValue?: string | number;
}

const Select = ({
  label,
  name,
  options,
  error,
  placeholder,
  onChange,
  resetSelect,
  defaultValue,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | number>(defaultValue || "");

  const handleSelect = (option: Option) => {
    setSelected(option.value);
    onChange(option.value);
    setIsOpen(false);
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase()),
  );

  // Reset logic: when resetSelect changes to true, clear the selection and search
  useEffect(() => {
    if (resetSelect) {
      setSelected(defaultValue || ""); // Reset to default value
      setSearch("");
    }
  }, [resetSelect, defaultValue]);

  // Set selected value when defaultValue changes
  useEffect(() => {
    setSelected(defaultValue || "");
  }, [defaultValue]);

  return (
    <div className="relative w-full">
      {/* Label */}
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

      {/* Select Button */}
      <div className="relative">
        <button
          type="button"
          className={`w-full px-3 py-2 border rounded-md shadow-sm flex justify-between items-center text-left transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm ${
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
              : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-700 dark:bg-transparent dark:text-white"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>
            {selected
              ? options.find(option => option.value === selected)?.label
              : placeholder || "Select..."}
          </span>
          <div className={`ml-2 transform transition-transform ${isOpen ? "rotate-90" : ""}`}>
            <IoIosArrowForward />
          </div>
        </button>

        {/* Error Message */}
        {error && (
          <p className="mt-1 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        {/* Dropdown Options */}
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
            <input
              type="text"
              className="w-full px-3 py-2 border-b dark:bg-transparent focus:outline-none sm:text-sm"
              placeholder="Search..."
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <ul className="py-1 text-sm text-gray-700 dark:text-[#e9e9e9]">
              {filteredOptions.length > 0 ? (
                filteredOptions.map(option => (
                  <li
                    key={option.value}
                    className="cursor-pointer px-4 py-2 hover:bg-indigo-500 hover:text-white dark:hover:bg-gray-600"
                    onClick={() => handleSelect(option)}
                  >
                    {option.label}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No options found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
