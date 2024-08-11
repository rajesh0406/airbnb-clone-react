import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";

import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { ReviewCard } from "../Page/PlacePage";
import { ModalContainer, ModalWrapper } from "./Review-Modal";
import { ModalContext } from "../Context/ModalContext";

export const AllReviewsModal = () => {
  const { modalData, onClose } = useContext(ModalContext);

  return (
    <ModalWrapper className="fixed inset-0 flex items-end justify-center  px-0">
      <ModalContainer className="max-w-screen max-h-[90%] overflow-y-scroll">
        <div className="flex items-center justify-between gap-5">
          <h4 className="text-lg roboto-medium text-black">Add Review</h4>
          <IconButton onClick={onClose}>
            <ControlPointOutlinedIcon className="!w-8 !h-8 rotate-45 !text-custom-grey" />
          </IconButton>
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-5 max-h-[calc(90%-65px)] overflow-y-scroll">
          {modalData?.reviews?.map((review, idx) => (
            <ReviewCard review={review} key={idx} />
          ))}
        </div>
      </ModalContainer>
    </ModalWrapper>
  );
};
