import React from 'react';
import { create } from 'zustand';

interface ModalStore {
  children: React.ReactNode;
  isOpen: boolean;
  setClose: () => void;
  setOpen: () => void;
  setChildren: (children: React.ReactNode) => void;
  title: string;
  setTitle:(title:string) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  children: null,
  isOpen: false,
  title: '',
  setClose: () => set({ isOpen: false }),
  setTitle:(title:string)=> set({title}),
  setOpen: () => set({ isOpen: true }),
  setChildren: (children: React.ReactNode) => set({ children }),
}));

export default useModalStore;
