import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";

import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { ReviewCard } from "../Page/PlacePage";
import { ModalContainer, ModalWrapper } from "./Review-Modal";
import { ModalContext } from "../Context/ModalContext";
import { UserContext } from "../Context/UserContext";

export const LogoutModal = () => {
  const { modalData, onClose } = useContext(ModalContext);
  const { handleLogout } = useContext(UserContext);

  return (
    <ModalWrapper className="fixed inset-0 flex items-end justify-center  px-0">
      <ModalContainer className="sm:max-w-[420px] w-full">
        <div className="flex items-center justify-between gap-5">
          <h4 className="text-lg roboto-medium text-black">
            Are you sure you want to logout ?
          </h4>
          <IconButton onClick={onClose}>
            <ControlPointOutlinedIcon className="!w-8 !h-8 rotate-45 !text-custom-grey" />
          </IconButton>
        </div>
        <div className="flex items-center gap-3 ">
          <button
            onClick={onClose}
            className="py-3 px-8 w-full mt-3 roboto-medium border-2 flex items-center justify-center  rounded-[12px] text-center bg-black text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleLogout?.();
              onClose();
            }}
            className="py-3 px-8 w-full mt-3 roboto-medium border-2 flex items-center justify-center  rounded-[12px] border-black text-center text-black"
          >
            Logout
          </button>
        </div>
      </ModalContainer>
    </ModalWrapper>
  );
};
