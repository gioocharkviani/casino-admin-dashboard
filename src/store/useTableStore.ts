import { create } from 'zustand';

interface TableState {
  data: any[]; // Data for the table
  page: number; // Current page
  perPage: number; // Rows per page
  maxPage: number; // Maximum number of pages
  sortBy: string; // Field to sort by
  sortDirection: 'asc' | 'desc'; // Sort direction
  search: string; // Search query
  totalItems: string; // Total items count
  visibleColumns: any[]; // Array of visible column names
  selectedRows: any[]; // Array of selected row IDs
  setSelectedRows: (ids: any[]) => void; // Function to update selected rows
  setVisibleColumns: (column: any[]) => void; // Function to update visibleColumns
  setData: (data: any[]) => void; // Function to set table data
  setPage: (page: number) => void; // Function to update the page
  setTotalItems: (totalItems: string) => void; // Function to update total items
  setPerPage: (perPage: number) => void; // Function to update rows per page
  setSort: (sortBy: string, sortDirection: 'asc' | 'desc') => void; // Sorting
  setSearch: (query: string) => void; // Function to update search query
  setMaxPage: (maxPage: number) => void; // Function to update max pages
}

const useTableStore = create<TableState>((set) => ({
  data: [],
  visibleColumns: [],
  page: 1,
  perPage: 10,
  maxPage: 1,
  sortBy: '',
  sortDirection: 'asc',
  search: '',
  totalItems: '',
  selectedRows: [],

  // Function implementations
  setData: (data) => set({ data }),
  setPage: (page) => set({ page }),
  setPerPage: (perPage) => set({ perPage }),
  setSort: (sortBy, sortDirection) => set({ sortBy, sortDirection }),
  setSearch: (query) => set({ search: query }),
  setMaxPage: (maxPage) => set({ maxPage }),
  setTotalItems: (totalItems) => set({ totalItems }),
  setVisibleColumns: (columns) => set({ visibleColumns: columns }),
  setSelectedRows: (ids) => set({ selectedRows: ids }),
}));

export default useTableStore;
