import React, { createContext, Fragment, useEffect, useState } from "react";

import Modal from "@mui/material/Modal";
import { ReviewModal } from "../Modal";
import { cn } from "../../helper";
import { AllReviewsModal } from "../Modal/All-Review-Modal";
import AuthModal from "../Modal/Auth-Modal";
import AddListingModal from "../Modal/Add-Listing-Modal";

export const ModalContext = createContext({
  onOpen: () => {},
  type: null,
  modalData: {},
  isOpen: false,
  onClose: () => {},
  updateModalData: () => {},
});

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(null);
  const [modalData, setModalData] = useState(null);

  const onOpen = (modalType) => {
    setType(modalType);
  };

  const onClose = () => {
    setType(null);
  };

  const updateModalData = (data) => {
    setModalData(data);
  };

  useEffect(() => {
    setIsOpen(!!type);
  }, [type]);

  const getModalComponent = () => {
    switch (type) {
      case "add-review":
        return <ReviewModal />;
      case "all-reviews":
        return <AllReviewsModal />;
      case "auth":
        return <AuthModal />;
      case "add-new-listing":
        return <AddListingModal />;
      default:
        return <></>;
    }
  };

  return (
    <ModalContext.Provider
      value={{
        onOpen,
        type,
        modalData,
        isOpen,
        onClose,
        updateModalData,
      }}
    >
      <Fragment>{children}</Fragment>
      {isOpen && (
        <Modal
          open={isOpen}
          onClose={onClose}
          onClick={onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className={cn("cursor-default")}
        >
          {getModalComponent()}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};
