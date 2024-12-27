// HomeModal.tsx

import React, { useEffect } from "react";

interface HomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HomeModal: React.FC<HomeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Perform any side effects when modal is opened
      console.log("Home Modal Opened");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col md:flex-row justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-3/4 md:w-1/3">
        <h3 className="text-xl font-bold mb-4">Join Wishlist</h3>
        <div className="flex justify-end">
          <button onClick={onClose} className="text-xl font-semibold">X</button>
        </div>
        {/* Modal Content Goes Here */}
        <p>More content for the Home Modal.</p>
      </div>
    </div>
  );
};

export default HomeModal;
