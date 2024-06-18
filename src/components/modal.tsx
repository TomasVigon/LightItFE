import React, { useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className="modal">
      <button className="modal-close" onClick={onClose}>
        &times;
      </button>
      <div className="modal-content">
        <h2>Modal Title</h2>
        <p>{message}</p>
      </div>
    </dialog>
  );
};

export default Modal;