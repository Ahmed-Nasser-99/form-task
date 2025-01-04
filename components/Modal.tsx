import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50  ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-4 rounded-md w-1/2  relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 border border-red-500 rounded-md aspect-square flex items-center justify-center w-5 h-5"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
