"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { IoClose } from "react-icons/io5";
import useModalStore from "@/store/useModalStore";

const Modal = () => {
  const { children, isOpen, setClose, setOpen, title, setChildren } = useModalStore();
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Close modal and clean up state

  const closeModal = useCallback(() => {
    setChildren(null);
    setClose();
    document.body.classList.remove("overflow-hidden");
  }, [setClose, setChildren]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    },
    [closeModal],
  );

  // Add/remove event listener for clicking outside and handle scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden"); // Disable scroll on main page
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.body.classList.remove("overflow-hidden"); // Ensure scroll is enabled when modal closes
      };
    }
  }, [isOpen, handleClickOutside]);

  // Don't render modal if it's not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 px-4 flex items-center justify-center bg-black bg-opacity-50 z-[999999]">
      <div
        ref={modalRef}
        className="bg-white dark:bg-darkBlue max-h-[100vh] h-max rounded-lg shadow-lg  max-w-[90vw] p-4 relative"
      >
        <div className="flex justify-between items-center gap-5  mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={closeModal}
          >
            <IoClose />
          </button>
        </div>
        <div className="modalCont pr-2 overflow-y-auto max-h-[80vh]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
