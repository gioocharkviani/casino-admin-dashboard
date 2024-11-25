import { create } from "zustand";

interface GlobalState {
  refetch: boolean;
  setRefetch: () => void;
}

const useRefetchStore = create<GlobalState>(set => ({
  refetch: false,
  setRefetch: () => set(state => ({ refetch: !state.refetch })),
}));

export default useRefetchStore;
