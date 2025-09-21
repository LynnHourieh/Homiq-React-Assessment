import type { ModalProps } from "../models/components";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full p-6 rounded-lg bg-[#F3F4F6]
                   border border-transparent 
                   [background-clip:padding-box] 
                   shadow-xl 
                   before:absolute before:inset-0 before:rounded-lg before:p-[2px] 
                   before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:-z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
