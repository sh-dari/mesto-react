import { useEffect } from "react";
const Popup = ({ isOpen, onClose, name, children }) => {
  const isOpened = isOpen ? "popup_opened" : "";
  useEffect(() => {
    if (!isOpen) return;
    const handleCloseEscPopup = (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleCloseEscPopup)
    return () => document.removeEventListener('keydown', handleCloseEscPopup)
  }, [isOpen, onClose])

  const handleOverlayClose = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }

  return (
    <div
      className={`popup popup_for_${name} ${isOpened}`}
      onMouseDown={handleOverlayClose}
    >
      {children}
    </div>
  );
};

export default Popup;
