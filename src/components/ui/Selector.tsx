import React, { useEffect, useState } from "react";
import Input from "./Input";
import Checkbox1 from "./Checkbox1";
import Button from "./Button";
import useSelectorStore from "@/store/useSelectorStore";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface SelectorProps<T> {
  data: T[];
  displayKey: keyof T;
  uniqueKey: keyof T;
  error?: string; // Add error prop
}

const Selector = <T,>({ data, displayKey, uniqueKey, error }: SelectorProps<T>) => {
  const {
    selectorData,
    setSelectorData,
    addSelectedItem,
    removeSelectedItem,
    selectedItem,
    setFilteredData,
    filteredData,
  } = useSelectorStore();

  const [searchQuery, setSearchQuery] = useState("");

  // Update local state when selectedItem changes
  const [mappedData, setMappedData] = useState<T[]>([]);

  useEffect(() => {
    setSelectorData(data);
  }, [data, setSelectorData]);

  useEffect(() => {
    setMappedData(filteredData.length > 0 ? filteredData : selectorData);
  }, [selectedItem, filteredData, selectorData]);

  const selectItem = (item: T) => {
    addSelectedItem(item);
  };

  const searchItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query); // Update the search query
    const filterItem = selectorData.filter(item =>
      String(item[displayKey]).toLowerCase().includes(query),
    );
    setFilteredData(filterItem);
  };

  const removeFromSelected = (id: any) => {
    removeSelectedItem(id);
  };

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      selectorData.forEach(item => {
        addSelectedItem(item);
      });
    } else {
      selectedItem.forEach(item => {
        removeSelectedItem(item[uniqueKey]);
      });
    }
  };

  //SELECTED ITEM MAP
  let SelectedItemMap = selectedItem.map((i: any) => (
    <li
      key={i[uniqueKey]}
      onClick={() => removeFromSelected(i[uniqueKey])}
      className="bg-white flex justify-between dark:hover:bg-bs-dark items-center dark:bg-darkBlue py-2 px-3 hover:bg-slate-100 text-sm rounded-md shadow-lg cursor-pointer"
    >
      {i[displayKey]}
      <IoClose className="text-red-500" />
    </li>
  ));

  useEffect(() => {
    SelectedItemMap;
  }, [selectedItem]);
  //SELECTED ITEM MAP

  return (
    <div className="flex flex-col w-full max-h-[70vh] min-h-[400px] min-w-[40vw] gap-4 selector">
      {/* Display error message if there is one */}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex justify-center items-center gap-4">
        <Checkbox1
          label="Select All"
          id="select-all"
          onChange={toggleSelectAll}
          checked={selectedItem.length === selectorData.length}
        />
        <Input onChange={e => searchItem(e)} type="text" placeholder="Find User" />
      </div>

      <div className="flex gap-3 flex-col lg:flex-row w-full h-full pb-4">
        {/* Filtered Data List */}
        <div className="bg-white dark:bg-darkBg overflow-y-auto max-h-[300px] h-full rounded-md shadow-lg p-2 w-full">
          <ul className="flex flex-col gap-2">
            {searchQuery && filteredData.length === 0 ? (
              <li className="text-center text-gray-500">No results found for {searchQuery}.</li>
            ) : mappedData.length > 0 ? (
              mappedData.map((i: any) => (
                <li
                  key={i[uniqueKey]}
                  onClick={() => selectItem(i)}
                  className={`bg-white flex dark:hover:bg-bs-dark justify-between items-center dark:bg-darkBlue py-2 px-3 hover:bg-slate-100 text-sm rounded-md shadow-lg cursor-pointer`}
                >
                  {i[displayKey]}
                  {selectedItem.some(item => item[uniqueKey] === i[uniqueKey]) && (
                    <FaCheck className="text-bs-success" />
                  )}
                </li>
              ))
            ) : (
              <li className="text-center text-gray-500">No results found.</li>
            )}
          </ul>
        </div>

        {/* Selected Items List */}
        <div className="bg-white dark:bg-darkBg rounded-md overflow-y-auto max-h-[300px] shadow-lg p-2 w-full h-full">
          <ul className="flex flex-col gap-2">
            {selectedItem.length > 0 ? (
              SelectedItemMap
            ) : (
              <li className="text-center text-gray-500">No items selected.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Selector;
