import { ReactNode, useEffect } from "react";
import { Modal } from "@mui/material";

type ModalProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

function CustomModal({ children, open, onClose }: ModalProps) {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="custom-modal-title"
      aria-describedby="custom-modal-description"
      sx={{
   
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        },
      }}
    >
      <>{children}</>
    </Modal>
  );
}

export default CustomModal;
