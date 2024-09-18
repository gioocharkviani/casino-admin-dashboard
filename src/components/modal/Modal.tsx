"use client"
import React, { useRef, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import useModalStore from '@/store/useModalStore';

const Modal = () => {
  const { children, isOpen, setClose, setOpen, title, setChildren } = useModalStore();
  const modalRef = useRef<HTMLDivElement | null>(null);;

  const closeModal = () => {
    setChildren(null);
    setClose();
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setChildren(null);
      closeModal();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 px-5 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div 
        ref={modalRef} 
        className="bg-white  dark:bg-darkBlue rounded-lg shadow-lg w-full max-w-lg p-6 relative"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={closeModal}
          >
            <IoClose />
          </button>
        </div>
        <div className="modal-content overflow-y-auto ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
