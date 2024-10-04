import { create } from 'zustand';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: string | null;
  mobile_number: string | null;
  user_name: string;
  address: string | null;
  city: string | null;
  country: string;
  birthday: string | null;
  balance: number;
  is_activated: boolean;
  is_verified: number;
  roles: string[];
  created_at: string;
  updated_at: string;
}

// Define the user state type
interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

// Create the Zustand store
const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
