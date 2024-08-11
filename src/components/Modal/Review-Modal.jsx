import { IconButton, TextareaAutosize } from "@mui/material";
import React, { useContext, useState } from "react";

import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { toast } from "react-toastify";
import { cn } from "../../helper";
import { addReview } from "../../api/api";
import Loader from "../Loader";
import { Visibility } from "@mui/icons-material";
import { ModalContext } from "../Context/ModalContext";

export const ModalContainer = (props) => {
  return (
    <div
      className={cn(
        "bg-white rounded-tl-[12px] rounded-tr-[12px] rounded-b-none sm:rounded-[14px] p-5 max-w-[450px] w-full max-h-[550px] overflow-y-scroll",
        props?.className
      )}
    >
      {props.children}
    </div>
  );
};

export const ModalWrapper = (props) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={cn(
        "fixed inset-0 flex items-end justify-center sm:items-center  px-0 sm:px-5",
        props?.className
      )}
    >
      {props.children}
    </div>
  );
};

export const ReviewModal = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [loader, setLoader] = useState(false);

  const { modalData, onClose } = useContext(ModalContext);

  const updateRating = (current) => {
    setRating(current);
  };

  const updateComments = (current) => {
    setComment(current);
  };

  const addFeedback = async () => {
    if (!comment) {
      toast.warn("Please add a comment!");
      return;
    }
    setLoader(true);

    const data = {
      listing: modalData.listing,
      rating,
      comment,
    };

    try {
      await addReview(data);
      modalData?.refetch?.();
      toast.success("Added Review Successfully!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add review");
      console.log(err);
    } finally {
      setLoader();
      onClose?.();
    }
  };
  return (
    <ModalWrapper>
      <ModalContainer>
        <div className="flex items-center justify-between gap-5">
          <h4 className="text-lg roboto-medium text-black">Add Review</h4>
          <IconButton onClick={onClose}>
            <ControlPointOutlinedIcon className="!w-8 !h-8 rotate-45 !text-custom-grey" />
          </IconButton>
        </div>
        <div className="mt-3 flex flex-col gap-5">
          <div className="flex items-center gap-1 ">
            {Array(5)
              .fill(0)
              .map((_, idx) => (
                <IconButton
                  onClick={() => {
                    updateRating(idx + 1);
                  }}
                  className="!text-primary !m-0 !p-0"
                  style={{ margin: "0px" }}
                >
                  {idx + 1 <= rating ? (
                    <StarOutlinedIcon
                      color="inherit"
                      style={{ width: "30px", height: "30px" }}
                    />
                  ) : (
                    <StarBorderPurple500OutlinedIcon
                      color="inherit"
                      style={{ width: "30px", height: "30px" }}
                    />
                  )}
                </IconButton>
              ))}
          </div>
          <TextareaAutosize
            minRows={4}
            className="w-full border rounded-[12px] h-full p-[10px]"
            placeholder="Share your feedback.."
            onChange={(e) => {
              updateComments(e.target.value);
            }}
          />
          <button
            onClick={() => {
              addFeedback();
            }}
            className="py-3 px-8 pl-[70px] border-2 flex items-center justify-center  rounded-[12px] text-center bg-black text-white"
          >
            Share Review{" "}
            <Loader
              wrapperStyles={{
                maxWidth: "50px",
                visibility: loader ? "visible" : "hidden",
              }}
            />
          </button>
        </div>
      </ModalContainer>
    </ModalWrapper>
  );
};
