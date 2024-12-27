import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{title}</h3>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
              ×
            </button>
          </div>
          <div>{children}</div>
          <div className="mt-4 flex justify-end">
            <button onClick={onClose} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
