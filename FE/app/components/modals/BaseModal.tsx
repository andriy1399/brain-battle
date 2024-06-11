import React, { ReactNode } from "react";
import Modal from "react-modal";
import { Button } from "../elements";

interface BaseModalProps {
  isOpen: boolean;
  onSubmit: () => void;
  canClose?: boolean;
  onClose?: () => void;
  children: ReactNode;
  submitBtnText?: string;
  size?: "medium" | "large";
}

Modal.setAppElement("body");

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onSubmit,
  canClose = true,
  onClose,
  children,
  submitBtnText,
  size = "medium",
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
    if (onClose) {
      onClose();
    }
  };

  const handleRequestClose = () => {
    if (canClose && onClose) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
      contentLabel="Submit Modal"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div
        className={`bg-bg-200 p-6 mx-auto rounded-lg w-full ${
          size === "large" ? "max-w-3xl" : "max-w-lg"
        }`}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">{children}</div>
          <div className="flex justify-center gap-3">
            {canClose && (
              <Button
                variant="secondary"
                type="button"
                onClick={handleRequestClose}
              >
                Close
              </Button>
            )}
            <Button type="submit">{submitBtnText ?? "Submit"}</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default BaseModal;
