import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { IoIosSettings, IoMdAdd } from 'react-icons/io';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { HiSortAscending, HiSortDescending } from 'react-icons/hi'; // Import sort icons
import Link1 from '../ui/Link1';
import Button from '../ui/Button';
import { IoFilter, IoSave } from 'react-icons/io5';
import Input from '../ui/Input';

import useTableStore from '@/store/useTableStore';
import useModalStore from '@/store/useModalStore';
import Checkbox1 from '../ui/Checkbox1';

interface TableProps {
  options: object | any,
}

const Tables = ({ options }: TableProps) => {
  const { visibleColumns,data, sortBy, totalItems, sortDirection, setSort, search, maxPage, setSearch, setPage, page, selectedRows, setSelectedRows , setVisibleColumns  } = useTableStore();
  const { setOpen, setChildren, setTitle } = useModalStore();
  const [allSelected, setAllSelected] = useState(false);

  
  // Columns && rows
  const columns = data?.length > 0 ? Object.keys(data[0]) : [];
  const rowsData = data?.length > 0 ? data : [];
  // Columns && rows

  
  
  // SETTINGS
  const [settingSaveData , SetSettingSaveData] = useState({

  })

  const saveSettingsData = ()=>{
    const settingsData = localStorage.setItem(options.settings.title , JSON.stringify(settingSaveData))
    return settingsData;
  }

  const setVisibleCol = ({e ,col}:any) => {
    if(e.target.checked){
      setVisibleColumns([...visibleColumns ,col])
    }else{
      const filterItems = visibleColumns.filter((c)=> c !== col)
      setVisibleColumns(filterItems)
    }
  };
//coment for change user
  let childElement = (
    <div className="flex flex-col w-full gap-4">
      <h2>Show or hide columns</h2>
      <form className="flex flex-wrap w-full gap-2">
        {columns.map((col:any) => (
          <Checkbox1
            key={col}
            id={col}
            label={col}
            checked={visibleColumns.includes(col)} 
            onChange={(e) => setVisibleCol({e, col})}
          />
        ))}
      </form>
      <h2>Per page</h2>
      <Button onClick={()=>saveSettingsData()}>
        <IoSave /> Save
      </Button>
    </div>
  );


const setting = () => {
  setOpen();
  setTitle('Table settings');
  setChildren(childElement);
};

useEffect(()=>{
  setChildren(childElement);
},[visibleColumns])

// SETTINGS


// FilterModal
const filterModal = () => {
  setOpen();
  setChildren(<div>filter function</div>);
};


  // Sort function
  const handleSort = (column: any) => {
    if (sortBy === column) {
      setSort(column, sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSort(column, 'asc');
    }
  };

  // Render sort icon
  const renderSortIcon = (column: string) => {
    if (sortDirection === 'asc' && sortBy === column) {
      return <HiSortDescending />;
    } else {
      return <HiSortAscending />;
    }
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Highlight search term
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="text-indigo-500 font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Select All handler
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      const allRowIds = rowsData.map((row) => row.id);
      setSelectedRows(allRowIds);
    }
    setAllSelected(!allSelected);
  };

  // Handle individual row selection
  const handleRowSelect = (id: any) => {
    const isSelected = selectedRows.includes(id);
    if (isSelected) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  useEffect(() => {
    if (selectedRows.length === rowsData.length && rowsData.length > 0) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }, [selectedRows, rowsData]);

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex justify-between gap-3">
          {/* SEARCH */}
          <div className="flex w-max gap-2 justify-center items-center">
            {options.search && (
              <Input
                type="text"
                placeholder="search"
                value={search}
                onChange={handleSearchChange}
              />
            )}
          </div>
          {/* SEARCH */}
          <div className="flex gap-2 justify-center">
            {/* FILTER BUTTON */}
            {options.filter && (
              <Button onClick={() => filterModal()}>
                <IoFilter />
              </Button>
            )}
            {/* FILTER BUTTON */}

            {/* FILTER BUTTON */}
            {options.settings.active && (
              <Button onClick={() => setting()}>
                <IoIosSettings />
              </Button>
            )}
            {/* FILTER BUTTON */}

            {/* SAVE BUTTON */}
            {options.saveData && (
              <Button>
                <IoSave />
              </Button>
            )}
            {/* SAVE BUTTON */}

            {/* CREATE NEW */}
            {options.create.active && (
              <Link1 link={options.create.link} icon={IoMdAdd} style="green" title="CREATE" />
            )}
            {/* CREATE NEW */}
          </div>
        </div>

        {/* Conditional rendering for the message when no data is available */}
        {rowsData.length === 0 ? (
          <div className="flex justify-center items-center mt-10">
            <p className="text-gray-500">No data available.</p>
          </div>
        ) : (
          <div className="overflow-x-auto pb-5 mt-5 border rounded-md shadow-lg table-container">
            <table className="min-w-full w-max text-left table-auto border-collapse">
              {/* TABLE HEAD */}
              <thead>
                <tr className="text-sm font-light">
                  {/* CHECKBOX FOR SELECT ALL */}
                  {options.select &&
                    <th>
                    <input type="checkbox" checked={allSelected} onChange={handleSelectAll} />
                  </th>
                  }
                  {/* END CHECKBOX FOR SELECT ALL */}

                  {/* MAP ALL COLUMNS */}
                  {columns.map((i) => (
                    <th key={i}>
                      <button disabled={!options.sort} onClick={() => handleSort(i)}>
                        <div className="flex items-center w-full gap-4 justify-between">
                          <span>{i}</span>
                          {/* Check if this is the currently sorted column */}
                          {options.sort && renderSortIcon(i)}
                        </div>
                      </button>
                    </th>
                  ))}
                  {/* END MAP ALL COLUMNS */}

                  {/* ACTIONS LABEL */}
                  {options.actions.active && (
                    <th>
                      <div className="w-full flex justify-end items-center h-full">
                        <span>Actions</span>
                      </div>
                    </th>
                  )}
                  {/* ACTIONS LABEL */}
                </tr>
              </thead>
              {/* END TABLE HEAD */}

              <tbody>
                {rowsData.map((row: any) => (
                  <tr key={row.id} className="hover:bg-[#f6f6f6] dark:hover:bg-darkBg">
                    {/* CHECKBOX FOR SELECT EACH ROW */}
                    {options.select &&
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => handleRowSelect(row.id)}
                        />
                    </td>
                    }
                    {/* END CHECKBOX FOR SELECT EACH ROW */}

                        {/* MAP ROW DATA */}
                        {columns.map((col: string) => (
                          <td className="text-sm" key={col}>
                            {col === 'roles' && row[col] && row[col].length > 0 ? (
                              // Check if the column is 'roles' and roles array is not empty
                              <span>{row[col][0].name}</span>
                            ) : row[col] === undefined ? (
                              'undefined'
                            ) : row[col] === null ? (
                             'null'
                            ) : (
                              highlightText(row[col].toString(), search)
                            )}
                          </td>
                        ))}
                        {/* MAP ROW DATA */}

                    {/* ACTIONS */}
                    {options.actions.active && (
                      <td>
                        <div className="w-full relative flex gap-2 justify-end items-center h-full">
                          {options.actions.edit && (
                            <FaRegEdit
                              title="edit"
                              className="cursor-pointer hover:text-indigo-500"
                            />
                          )}
                          {options.actions.remove && (
                            <AiOutlineDelete
                              title="remove"
                              className="cursor-pointer hover:text-red-500"
                            />
                          )}
                        </div>
                      </td>
                    )}
                    {/* ACTIONS */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        <div className="mt-5 mb-2 flex justify-end mr-2">
          <div className="flex w-max gap-3 items-center">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="font-bold text-lg p-1">
              <MdKeyboardArrowLeft />
            </button>
            <span className="text-sm">
              {page} / {maxPage}
            </span>
            <button disabled={page === maxPage} onClick={() => setPage(page + 1)} className="font-bold text-lg p-1">
              <MdKeyboardArrowRight />
            </button>
              <span className="text-sm">Total Items: {totalItems || 0}</span>
          </div>
        </div>
        {/* PAGINATION */}
      </div>
    </div>
  );
};

export default Tables;
