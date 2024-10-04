import { create } from 'zustand';

// Define the user state type
interface UserState {
  user: {} | null;
  setUser: (user: {}) => void;
  clearUser: () => void;
}

// Create the Zustand store
const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
