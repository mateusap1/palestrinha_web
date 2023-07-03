import React, { ReactNode, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const overlayClasses = isOpen ? 'bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center z-50 cursor-pointer-none' : 'hidden';

  return (
    <div className={overlayClasses}>
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col w-80 cursor-pointer-auto">
        <div className="">{children}</div>
        
        <button
          className="mt-4 px-4 py-2 bg-gray-500 hover:opacity-80 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};
