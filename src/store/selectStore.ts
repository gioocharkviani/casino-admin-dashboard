// store/selectStore.ts
import create from 'zustand';

interface SelectStore {
  selectedItems: string[];
  selectAll: boolean;
  searchQuery: string;
  setSelectedItems: (items: string[]) => void;
  toggleSelectAll: (value: boolean) => void;
  setSearchQuery: (query: string) => void;
}

export const useSelectStore = create<SelectStore>((set) => ({
  selectedItems: [],
  selectAll: false,
  searchQuery: '',
  setSelectedItems: (items) => set({ selectedItems: items }),
  toggleSelectAll: (value) => set({ selectAll: value }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
