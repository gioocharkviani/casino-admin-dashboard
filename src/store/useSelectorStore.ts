import create from 'zustand';

interface SelectorStore<T> {
  selectorData: T[];
  filteredData: T[];
  selectedItem: T[];
  setSelectorData: (data: T[]) => void;
  setFilteredData: (data: T[]) => void;
  addSelectedItem: (item: T) => void;
  removeSelectedItem: (id: string | number) => void;
  resetSelectedItems: () => void; // Reset selected items
}

const useSelectorStore = create<SelectorStore<any>>((set) => ({
  selectorData: [],
  filteredData: [],
  selectedItem: [],
  setSelectorData: (data) => set({ selectorData: data }),
  setFilteredData: (data) => set({ filteredData: data }),

  // Add new item to the selected array, avoiding duplicates
  addSelectedItem: (item) =>
    set((state) => {
      const isAlreadySelected = state.selectedItem.some(
        (selected) => selected.id === item.id
      );
      if (!isAlreadySelected) {
        return { selectedItem: [...state.selectedItem, item] };
      }
      return state;
    }),

  // Remove selected item
  removeSelectedItem: (id) =>
    set((state) => ({
      selectedItem: state.selectedItem.filter((item) => item.id !== id),
    })),

  // New function to reset selected items
  resetSelectedItems: () => set({ selectedItem: [] }), // Reset selected items
}));

export default useSelectorStore;
