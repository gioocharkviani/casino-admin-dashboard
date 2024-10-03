import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { IoIosSettings, IoMdAdd } from 'react-icons/io';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { HiSortAscending, HiSortDescending } from 'react-icons/hi';
import Link1 from '../ui/Link1';
import Button from '../ui/Button';
import { IoFilter, IoSave } from 'react-icons/io5';
import Input from '../ui/Input';
import * as XLSX from 'xlsx';

import useTableStore from '@/store/useTableStore';
import useModalStore from '@/store/useModalStore';
import Checkbox1 from '../ui/Checkbox1';
import Link from 'next/link';
import Checkbox from '../ui/Checkbox';
import { TableOptions } from './tableOptions.types';

interface TableProps {
  options: TableOptions;
}

const Tables = ({ options }: TableProps) => {
  const {
    visibleColumns,
    data,
    sortBy,
    totalItems,
    sortDirection,
    setPerPage,
    perPage,
    setSort,
    search,
    maxPage,
    setSearch,
    setPage,
    page,
    selectedRows,
    setSelectedRows,
    setVisibleColumns,
  } = useTableStore();
  const { setOpen, setChildren, setTitle } = useModalStore();
  const [allSelected, setAllSelected] = useState(false);
  const router = useRouter();
  // Columns && rows
  const columns = data?.length > 0 ? Object.keys(data[0]) : [];
  const rowsData = data?.length > 0 ? data : [];
  const colMap = visibleColumns.length === 0 ? columns : visibleColumns;
  // Columns && rows

  useEffect(() => {
    setPage(1);
  }, [perPage]);

  // SETTINGS

  // Temporary states for managing the form data
  const [tempVisibleColumns, setTempVisibleColumns] = useState(colMap);
  const [tempPerPage, setTempPerPage] = useState(perPage);

  // Save the settings data to localStorage and apply it to the table
  const saveSettingsData = () => {
    const settingsData = {
      visibleColumns: tempVisibleColumns,
      perPage: tempPerPage,
    };
    localStorage.setItem(options.settings.title, JSON.stringify(settingsData));

    // Update the actual state with the temp values
    setVisibleColumns(tempVisibleColumns);
    setPerPage(tempPerPage);
  };

  const setTempVisibleCol = ({ e, col }: any) => {
    let updatedVisibleColumns;
    if (e.target.checked) {
      updatedVisibleColumns = [...tempVisibleColumns, col].sort(
        (a, b) => columns.indexOf(a) - columns.indexOf(b)
      );
    } else {
      updatedVisibleColumns = tempVisibleColumns.filter((c) => c !== col);
    }
    setTempVisibleColumns(updatedVisibleColumns);
  };

  // Update childElement to use the temporary states
  let childElement = (
    <div className="flex flex-col w-full gap-4">
      <h2>Show or hide columns</h2>
      <form className="flex flex-wrap w-full gap-2">
        {columns.map((col: any) => (
          <Checkbox1
            key={col}
            id={col}
            label={col}
            checked={tempVisibleColumns.includes(col)}
            onChange={(e) => setTempVisibleCol({ e, col })}
          />
        ))}
      </form>
      <h2>Per page</h2>
      <Input
        type="number"
        value={tempPerPage.toString()}
        onChange={(e) => setTempPerPage(Number(e.target.value))}
        min={1}
      />
      <Button onClick={() => saveSettingsData()}>
        <IoSave /> Save
      </Button>
    </div>
  );

  // Reset store values when the page changes
  useEffect(() => {
    setSelectedRows([]);
    setSort('', 'asc');
    setSearch('');
    setVisibleColumns(columns);
  }, [page]);

  // Handle setting opening and apply child element
  const setting = () => {
    setTempVisibleColumns(colMap);
    setTempPerPage(perPage);
    setOpen();
    setTitle('Table settings');
    setChildren(childElement);
  };

  // Retrieve settings from localStorage on initial load
  useEffect(() => {
    const storedSettings = localStorage.getItem(options.settings.title);
    if (storedSettings) {
      const parsedSettings = JSON.parse(storedSettings);
      if (parsedSettings.visibleColumns) {
        setVisibleColumns(parsedSettings.visibleColumns);
      }
      if (parsedSettings.perPage) {
        setPerPage(parsedSettings.perPage);
      }
    } else {
      setVisibleColumns(columns);
    }
  }, []);

  // Update child element whenever temp states change
  useEffect(() => {
    setChildren(childElement);
  }, [tempVisibleColumns, tempPerPage, visibleColumns]);

  // SETTINGS

  // FILTER
  const filterModal = () => {
    setOpen();
    setTitle('Filter By');
    setChildren(<div>filter function</div>);
  };
  // FILTER

  // SAVE DATA
  const saveAs = () => {
    // Filter only selected rows
    const selectedRowsData = rowsData.filter((row: any) =>
      selectedRows.includes(row.id)
    );
    const exportData = selectedRowsData.map((row: any) => {
      const rowData: any = {};
      colMap.forEach((col: string) => {
        rowData[col] =
          row[col] !== null && row[col] !== undefined ? row[col] : '';
      });
      return rowData;
    });

    const ws = XLSX.utils.json_to_sheet(exportData, { header: colMap });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'TablesData');
    XLSX.writeFile(wb, 'TABLE_DATA.xlsx');
  };
  // SAVE DATA

  // SORT FUNCTION
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
  // SORT FUNCTION

  //TRCLICKACTION
  const trClickHandler = (id: string | number) => {
    if (options.trclickaction.active) {
      router.push(`${options.trclickaction.link}/${id}`);
    }
  };
  //TRCLICKACTION

  // SEARCH
  const [debounceValue, setDebounceValue] = useState('');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebounceValue(e.target.value);
  };
  React.useEffect(() => {
    const getData = setTimeout(() => {
      setSearch(debounceValue);
    }, 500);
    return () => clearTimeout(getData);
  }, [debounceValue]);

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
  // SEARCH

  // SELECT
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
  // SELECT

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
                value={debounceValue}
                onChange={handleSearchChange}
              />
            )}
          </div>
          {/* SEARCH */}
          <div className="flex gap-2 justify-center">
            {/* FILTER BUTTON */}
            {options.filter.active && (
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
              <Button
                disable={selectedRows.length > 0}
                onClick={() => saveAs()}
              >
                <IoSave />
              </Button>
            )}
            {/* SAVE BUTTON */}

            {/* CREATE NEW */}
            {options.create.active && (
              <Link1
                link={options.create.link}
                icon={IoMdAdd}
                style="green"
                title="CREATE"
              />
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
            <table
              id="data-table"
              className="min-w-full w-max text-left table-auto border-collapse"
            >
              {/* TABLE HEAD */}
              <thead>
                <tr className="text-sm font-light">
                  {/* CHECKBOX FOR SELECT ALL */}
                  {options.select && (
                    <th>
                      <Checkbox
                        id="all-select-funct"
                        checked={allSelected}
                        onChange={handleSelectAll}
                      />
                    </th>
                  )}
                  {/* END CHECKBOX FOR SELECT ALL */}

                  {/* MAP ALL COLUMNS */}
                  {colMap.map((i) => (
                    <th key={i}>
                      <button
                        className="w-full"
                        disabled={!options.sort}
                        onClick={() => handleSort(i)}
                      >
                        <div className="flex items-center w-full gap-1">
                          {/* Check if this is the currently sorted column */}
                          {options.sort && renderSortIcon(i)}
                          <span>{i}</span>
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
                  <tr
                    onClick={() => trClickHandler(row.id)}
                    key={row.id}
                    className={`hover:bg-[#f6f6f6] dark:hover:bg-darkBg ${
                      options.trclickaction.active ? 'cursor-pointer' : ''
                    }`}
                  >
                    {/* CHECKBOX FOR SELECT EACH ROW */}
                    {options.select && (
                      <td>
                        <Checkbox
                          id={`row-select-${row.id}`}
                          checked={selectedRows.includes(row.id)}
                          onChange={() => handleRowSelect(row.id)} // Use correct handler
                        />
                      </td>
                    )}
                    {/* END CHECKBOX FOR SELECT EACH ROW */}

                    {/* MAP ROW DATA */}
                    {colMap.map((col: string) => (
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
                            <Link href={`${options.actions.edit}?id=${row.id}`}>
                              <FaRegEdit
                                title="edit"
                                className="cursor-pointer hover:text-indigo-500"
                              />
                            </Link>
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
        {options.pagination && (
          <div className="mt-5 mb-2 flex justify-end mr-2">
            <div className="flex w-max gap-3 items-center">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="font-bold text-lg p-1"
              >
                <MdKeyboardArrowLeft />
              </button>
              <span className="text-sm">
                {page} / {maxPage}
              </span>
              <button
                disabled={page === maxPage || maxPage === 0}
                onClick={() => setPage(page + 1)}
                className="font-bold text-lg p-1"
              >
                <MdKeyboardArrowRight />
              </button>
              {totalItems && (
                <span className="text-sm">Total Items: {totalItems || 0}</span>
              )}
            </div>
          </div>
        )}
        {/* PAGINATION */}
      </div>
    </div>
  );
};

export default Tables;
