"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { IoIosSettings, IoMdAdd } from "react-icons/io";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import { IoFilter, IoSave } from "react-icons/io5";
import * as XLSX from "xlsx";
import useModalStore from "@/store/useModalStore";
import { TableOptions } from "./tableOptions.types";
import { Input, Button, Link1, Checkbox, Checkbox1 } from "../ui";
import { BsThreeDots } from "react-icons/bs";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import { object } from "zod";

interface TableProps {
  options: TableOptions;
  data: any;
  metaData?: any;
}

const Table = ({ options, data, metaData }: TableProps) => {
  const { setOpen, setChildren, setTitle, isOpen } = useModalStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [allSelected, setAllSelected] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<string>("");

  const initialSearch = searchParams.get("search") || "";
  const initialPage = parseInt(searchParams.get("page") || "1");
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(initialPage);

  const createQueryString = useCallback(
    (params: { [key: string]: string | number | null }) => {
      const urlParams = new URLSearchParams(searchParams.toString());
      Object.keys(params).forEach(key => {
        if (params[key] === null || params[key] === "") urlParams.delete(key);
        else urlParams.set(key, params[key].toString());
      });
      return urlParams.toString();
    },
    [searchParams],
  );

  const isertPerPageQuery = (_: any) => {
    const newQueryString = createQueryString({
      per_page: _,
    });
    router.push(`${pathname}?${newQueryString}`);
  };

  // Retrieve settings from localStorage on initial load
  useEffect(() => {
    const storedSettings = localStorage.getItem(options.settings.title);
    if (storedSettings) {
      const parsedSettings = JSON.parse(storedSettings);
      if (parsedSettings) {
        setVisibleColumns(parsedSettings.visibleColumns);
      }
      if (parsedSettings.perPage) {
        setPerPage(parsedSettings.perPage);
        setTimeout(() => {
          isertPerPageQuery(parsedSettings.perPage);
        }, 200);
      }
    }
    if (!storedSettings) {
      setVisibleColumns([]);
    }
  }, []);

  // Reset store values when the page changes

  // Columns && rows
  const columns = data?.length > 0 ? Object.keys(data[0]) : [];
  const rowsData = data?.length > 0 ? data : [];
  let colMap = visibleColumns.length === 0 ? columns : visibleColumns;
  // Columns && rows

  // SETTINGS

  // Temporary states for managing the form data
  const [tempVisibleColumns, setTempVisibleColumns] = useState<any>(colMap);
  const [tempPerPage, setTempPerPage] = useState(perPage);

  // Save the settings data to localStorage and apply it to the table
  const saveSettingsData = () => {
    const settingsData = {
      visibleColumns: tempVisibleColumns,
      perPage: tempPerPage,
    };
    localStorage.setItem(options.settings.title, JSON.stringify(settingsData));
    isertPerPageQuery(tempPerPage);
    // Update the actual state with the temp values
    setVisibleColumns(tempVisibleColumns);
    setPerPage(tempPerPage);
  };

  const setTempVisibleCol = ({ e, col }: any) => {
    let updatedVisibleColumns;
    if (e.target.checked) {
      updatedVisibleColumns = [...tempVisibleColumns, col].sort(
        (a, b) => columns.indexOf(a) - columns.indexOf(b),
      );
    } else {
      updatedVisibleColumns = tempVisibleColumns.filter((c: any) => c !== col);
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
            onChange={e => setTempVisibleCol({ e, col })}
          />
        ))}
      </form>
      <h2>Per page</h2>
      <Input
        type="number"
        value={tempPerPage.toString()}
        onChange={e => setTempPerPage(Number(e.target.value))}
        min={1}
      />
      <Button onClick={() => saveSettingsData()}>
        <IoSave /> Save
      </Button>
    </div>
  );

  // Handle setting opening and apply child element
  const setting = () => {
    setTempVisibleColumns(colMap);
    setTempPerPage(perPage);
    setOpen();
    setTitle("Table settings");
    setChildren(childElement);
  };

  // Update child element whenever temp states change
  useEffect(() => {
    setChildren(childElement);
  }, [tempVisibleColumns, tempPerPage, visibleColumns]);

  // SETTINGS

  // SAVE DATA
  const saveAs = () => {
    // Filter only selected rows
    const selectedRowsData = rowsData.filter((row: any) => selectedRows.includes(row.id));
    const exportData = selectedRowsData.map((row: any) => {
      const rowData: any = {};
      colMap.forEach((col: string) => {
        rowData[col] = row[col] !== null && row[col] !== undefined ? row[col] : "";
      });
      return rowData;
    });

    const ws = XLSX.utils.json_to_sheet(exportData, { header: colMap });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "TablesData");
    XLSX.writeFile(wb, "TABLE_DATA.xlsx");
  };
  // SAVE DATA

  // SORT FUNCTION
  // SORT FUNCTION
  const handleSort = (column: any) => {
    setSortBy(column);
    let direction: any = sortDirection === "asc" ? "desc" : "asc";
    if (sortBy !== column) {
      direction = "asc";
    }
    setSortDirection(direction);
    const newQueryString = createQueryString({
      sort_by: column,
      sort_direction: direction,
    });
    router.push(`${pathname}?${newQueryString}`);
  };

  // Render sort icon
  const renderSortIcon = (column: string) => {
    if (sortDirection === "asc" && sortBy === column) {
      return <HiSortDescending />;
    } else {
      return <HiSortAscending />;
    }
  };
  // SORT FUNCTION

  //ACTIONS
  const actionLinkHendler = (link: any, id: string | number) => {
    router.push(`${link}${id}`);
  };

  const actionBtn = ({ title, Comp, key }: any) => {
    setOpen();
    setTitle(title);
    const component = <Comp id={key} />;
    setChildren(component);
  };

  const [actionMenu, setActionMenu] = useState<number | string | null>(null);
  const showAction = (id: number | string) => {
    setActionMenu(prev => (prev === id ? null : id));
  };
  //ACTIONS

  // SEARCH
  useEffect(() => {
    const newQueryString = createQueryString({
      search: debouncedSearch || null,
    });
    router.push(`${pathname}?${newQueryString}`);
  }, [debouncedSearch, pathname, router, createQueryString]);

  // Search input handler with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 100);
    return () => clearTimeout(handler);
  }, [search]);

  // Highlight search term
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return <div className="divHighliteText">{text}</div>;
    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="text-indigo-500 font-bold">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };
  // SEARCH

  // SELECT
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      const allRowIds = rowsData.map((row: any) => {
        const id =
          row.id ??
          (options.rowUniqueKey && row[options.rowUniqueKey?.key]?.[options.rowUniqueKey?.value]);
        return id;
      });
      setSelectedRows(allRowIds);
    }
    setAllSelected(!allSelected);
  };

  // Handle individual row selection
  const handleRowSelect = (id: any) => {
    const isSelected = selectedRows.includes(id);
    if (isSelected) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
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

  //PAGINATION SORT FILTER SELECT QUERY ALL PARAMS
  const handlePagination = (change: number) => {
    const newPage = page + change;
    setPage(newPage);
    const newQueryString = createQueryString({ page: newPage });
    router.push(`${pathname}?${newQueryString}`);
  };
  //PAGINATION SORT FILTER SELECT QUERY ALL PARAMS

  //IF DATA CONTAINS OBJECT
  const ifIsObj = ({ data, colName }: { data: object; colName: string }) => {
    if (typeof data === "object" && data !== null) {
      const content = Object.entries(data).map(([key, value], index) => (
        <div
          key={index}
          className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg shadow-sm"
        >
          <strong className="text-gray-700 dark:text-gray-300 font-medium">{key}</strong>
          <span className="text-gray-500 dark:text-gray-400">:</span>
          <span className="text-gray-900 dark:text-gray-100">{String(value)}</span>
        </div>
      ));

      const child = <div className="space-y-2 p-4 flex flex-col gap-1">{content}</div>;
      setTitle(colName || "");
      setChildren(child);
      setOpen();
    } else {
      console.error("The provided data is not an object.");
    }
  };
  //IF DATA CONTAINS OBJECT

  //EXTRA OPTIONS SETTINGS
  const colColor = (rowCol: string, colName?: string, id?: string | number) => {
    const checkColor = options.extraOptions?.colColor?.col_dependency.find(
      i => i.name === rowCol.toLowerCase(),
    );
    const openModal = () => {
      setOpen();
      setTitle(colName || "");
      const Component = options.extraOptions?.colColor?.actionComponent;
      setChildren(<Component id={id} />);
    };
    if (checkColor !== undefined || checkColor !== null) {
      return (
        <button
          disabled={
            options.extraOptions?.colColor?.actionComponent === null ||
            options.extraOptions?.colColor?.actionComponent === undefined
          }
          onClick={() => openModal()}
          style={{ backgroundColor: checkColor?.color, color: "white" }}
          className="px-2 py-1 rounded-sm w-full text-start"
        >
          {rowCol}
        </button>
      );
    }
    return <span>{rowCol}</span>;
  };
  //EXTRA OPTIONS SETTINGS

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex justify-between gap-3">
          {/* SEARCH */}
          <div className="flex w-max gap-2 justify-center items-center">
            {options.search && (
              <Input type="text" placeholder="search" value={search} onChange={handleSearchChange} />
            )}
          </div>
          {/* SEARCH */}
          <div className="flex gap-2 justify-center">
            {/* FILTER BUTTON */}
            {options.settings.active && (
              <Button onClick={() => setting()}>
                <IoIosSettings />
              </Button>
            )}
            {/* FILTER BUTTON */}

            {/* SAVE BUTTON */}
            {options.saveData && (
              <Button disable={selectedRows.length > 0} onClick={() => saveAs()}>
                <IoSave />
              </Button>
            )}
            {/* SAVE BUTTON */}

            {/* CREATE NEW */}
            {options.create?.active &&
              (options.create.type === "LINK" ? (
                <Link1 link={options.create.link} icon={IoMdAdd} style="green" title="CREATE" />
              ) : options.create.type === "MODAL" && options.create.component ? (
                <Button
                  onClick={() =>
                    actionBtn({
                      title: options.create.title || "Create New",
                      Comp: options.create.component,
                      key: options.create.key,
                    })
                  }
                >
                  {options.create.title || "Create New"}
                </Button>
              ) : null)}
            {/* CREATE NEW */}
          </div>
        </div>

        {/* Conditional rendering for the message when no data is available */}
        {rowsData.length === 0 ? (
          <div className="flex justify-center items-center mt-10">
            <p className="text-gray-500">No data available.</p>
          </div>
        ) : (
          <div className=" pb-5 mt-5 border rounded-md shadow-lg table-container">
            <table id="data-table" className="min-w-full w-max text-left  border-collapse">
              {/* TABLE HEAD */}
              <thead>
                <tr className="text-sm font-light">
                  {/* CHECKBOX FOR SELECT ALL */}
                  {options.select && (
                    <th>
                      <Checkbox id="all-select-funct" checked={allSelected} onChange={handleSelectAll} />
                    </th>
                  )}
                  {/* END CHECKBOX FOR SELECT ALL */}

                  {/* TABLE HEAD IMAGE */}
                  {options.image?.active && (
                    <th>
                      <div className="w-full flex justify-start items-center h-full">
                        <span>image</span>
                      </div>
                    </th>
                  )}
                  {/* TABLE HEAD IMAGE */}

                  {/* MAP ALL COLUMNS */}
                  {colMap.map(i => (
                    <th key={i}>
                      <button className="w-full" disabled={!options.sort} onClick={() => handleSort(i)}>
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
                {rowsData.map((row: any) => {
                  const id =
                    row.id ??
                    (options.rowUniqueKey &&
                      row[options.rowUniqueKey?.key]?.[options.rowUniqueKey?.value]);
                  return (
                    <tr key={id} className={`hover:bg-[#f6f6f6] dark:hover:bg-darkBg `}>
                      {/* CHECKBOX FOR SELECT EACH ROW */}
                      {options.select && (
                        <td>
                          <Checkbox
                            id={`row-select-${id}`}
                            checked={selectedRows.includes(id)}
                            onChange={() => handleRowSelect(id)} // Use correct handler
                          />
                        </td>
                      )}
                      {/* END CHECKBOX FOR SELECT EACH ROW */}

                      {/*RENDER IMAGE*/}
                      {options.image?.active && (
                        <td>
                          <Image
                            src={
                              options.image.inObjectKey
                                ? row[options.image.inObjectKey][options.image.imageDataKey]
                                : row[options.image.imageDataKey]
                            }
                            width={100}
                            height={50}
                            alt="null"
                            className="w-24 h-10 bg-gray-300 rounded-md overflow-hidden"
                          />
                        </td>
                      )}
                      {/*RENDER IMAGE*/}

                      {/* MAP ROW DATA */}
                      {colMap.map((col: string) => (
                        <td className="text-sm" key={col}>
                          {row[col] === undefined ? (
                            "undefined"
                          ) : row[col] === null ? (
                            "null"
                          ) : typeof row[col] === "object" ? (
                            Object.keys(row[col]).length === 0 ? (
                              "none"
                            ) : Object.keys(row[col]).length === 1 ? (
                              row[col][Object.keys(row[col])[0]]
                            ) : (
                              <button
                                className="border shadow-md text-sm px-4 py-[2px] rounded-md dark:border-black"
                                onClick={() => ifIsObj({ data: row[col], colName: col })}
                              >
                                {row[col].id}
                              </button>
                            )
                          ) : options.extraOptions?.colColor?.active &&
                            col === options.extraOptions.colColor.col_key ? (
                            colColor(row[col], col, row[options.uniqueKey || id])
                          ) : (
                            highlightText(row[col].toString(), search)
                          )}
                        </td>
                      ))}
                      {/* MAP ROW DATA */}

                      {/* ACTIONS */}
                      {options.actions.active && (
                        <td>
                          <div className="w-full flex gap-2 justify-end items-center h-full">
                            <div className="relative">
                              <BsThreeDots className=" cursor-pointer" onClick={() => showAction(id)} />
                              {actionMenu === id && (
                                <div
                                  className={`${
                                    actionMenu === id ? "opacity-1" : "opacity-0"
                                  } absolute right-0 rounded-md p-1 bg-white shadow-lg min-w-[100px] dark:bg-darkBlue border transition-all dark:border-darkBg top-[100%] z-[99]`}
                                >
                                  <ul className="flex flex-col">
                                    {options.actions.actions?.map(i => (
                                      <li
                                        key={i.name}
                                        className="px-1 py-1 cursor-pointer text-sm capitalize hover:bg-[#d7d7d7] dark:hover:bg-darkHover rounded-md"
                                      >
                                        {i.type === "MODAL" && (
                                          <button
                                            onClick={() =>
                                              actionBtn({
                                                title: i.name,
                                                Comp: i.component,
                                                key: row[i.key],
                                              })
                                            }
                                            className="capitalize flex items-center gap-2"
                                          >
                                            {i?.icon}
                                            {i.name}
                                          </button>
                                        )}
                                        {i?.type === "LINK" && (
                                          <button
                                            className="capitalize flex items-center gap-2"
                                            onClick={() => actionLinkHendler(i.link, row[i.key])}
                                          >
                                            {i?.icon}
                                            {i.name}
                                          </button>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      )}
                      {/* ACTIONS */}
                    </tr>
                  );
                })}
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
                onClick={() => handlePagination(-1)}
                className="font-bold text-lg p-1"
              >
                <MdKeyboardArrowLeft />
              </button>
              <span className="text-sm">{page}</span>
              <button
                disabled={page === metaData?.last_page}
                onClick={() => handlePagination(1)}
                className="font-bold text-lg p-1"
              >
                <MdKeyboardArrowRight />
              </button>
              {metaData && <span className="text-sm">Total Items: {metaData?.total || 0} </span>}
            </div>
          </div>
        )}
        {/* PAGINATION */}
      </div>
    </div>
  );
};

export default Table;
