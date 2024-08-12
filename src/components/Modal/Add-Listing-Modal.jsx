import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { IconButton, TextareaAutosize } from "@mui/material";

import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { ModalContainer, ModalWrapper } from "./Review-Modal";
import { ModalContext } from "../Context/ModalContext";
import { commonInputClassName } from "./Auth-Modal";
import { cn } from "../../helper";
import { tags } from "../../data";
import { addListing, addNewPlace, deleteProperty } from "../../api/api";
import dayjs from "dayjs";

const AddProperty = ({ onSuccess }) => {
  const [place, setPlace] = useState({
    title: "",
    description: "",
    photos: "",
    amenities: "",
    tags: [],
    address: "",
  });

  const updatePlace = (obj) => {
    setPlace((prev) => ({ ...prev, ...obj }));
  };

  const handleTagUpdate = (tag) => {
    let temp = place.tags;
    let idx = temp.indexOf(tag);
    if (idx !== -1) {
      temp.splice(idx, 1);
    }
    temp.push(tag);

    updatePlace({ tags: temp });
  };

  const onSubmit = async () => {
    try {
      if (
        !place.title ||
        !place.description ||
        !place.photos ||
        !place.amenities ||
        !place.address ||
        place.tags.length === 0
      ) {
        toast.warn("Please Enter all details");
        return;
      }
      const data = {
        title: place.title,
        description: place.description,
        photos: place.photos.split(","),
        amenities: place.amenities?.split(","),
        tags: place.tags,
        address: place.address,
      };

      const response = await addNewPlace(data);
      console.log("response", response?.data?.newPlace);

      if (response?.data?.newPlace) {
        onSuccess(response?.data?.newPlace);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to add new property");
    }
  };

  return (
    <div className="flex flex-col mt-3" id="place-details">
      <h4 className="text-xl roboto-medium text-black">
        Enter Property Details
      </h4>
      <form
        id="property-form"
        onSubmit={onSubmit}
        className="mt-3 flex flex-col gap-5 md:flex-row items-start  w-full max-h-[calc(90%-100px)] overflow-y-scroll"
      >
        <div className="w-full">
          <div className="w-full">
            <label
              className="text-[10px] roboto-bold text-black uppercase"
              htmlFor="title"
            >
              Title
            </label>
            <input
              id="title"
              className={cn(commonInputClassName, "py-2 mt-1")}
              type="text"
              placeholder="Enter Property Title"
              required={true}
              onChange={(e) => {
                updatePlace({ title: e.target.value });
              }}
            />
          </div>
          <div className="w-full">
            <label
              className="text-[10px] roboto-bold text-black uppercase"
              htmlFor="description"
            >
              Description
            </label>
            <TextareaAutosize
              minRows={4}
              id="description"
              className="w-full border rounded-[12px] h-full p-[10px]"
              placeholder="Enter Property Description"
              onChange={(e) => {
                updatePlace({ description: e.target.value });
              }}
            />
          </div>
          <div className="w-full">
            <label
              className="text-[10px] roboto-bold text-black uppercase"
              htmlFor="address"
            >
              Address
            </label>
            <TextareaAutosize
              minRows={4}
              id="address"
              className="w-full border rounded-[12px] h-full p-[10px]"
              placeholder="Enter Property Address"
              onChange={(e) => {
                updatePlace({ address: e.target.value });
              }}
            />
          </div>
          <div className="w-full">
            <label
              className="text-[10px] roboto-bold text-black uppercase"
              htmlFor="amenities"
            >
              Amenities
            </label>
            <TextareaAutosize
              minRows={4}
              id="amenities"
              className="w-full border rounded-[12px] h-full p-[10px]"
              placeholder="Enter amenities as comma separated text"
              onChange={(e) => {
                updatePlace({ amenities: e.target.value });
              }}
            />
          </div>
          <div className="w-full">
            <label
              className="text-[10px] roboto-bold text-black uppercase"
              htmlFor="photos"
            >
              Photos
            </label>
            <TextareaAutosize
              minRows={4}
              id="photos"
              className="w-full border rounded-[12px] h-full p-[10px]"
              placeholder="Enter photo urls as comma separated text"
              onChange={(e) => {
                updatePlace({ photos: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="w-full">
          <label className="text-[10px] roboto-bold text-black uppercase">
            Tags
          </label>
          <div className="w-full flex flex-wrap items-start mt-2 gap-4">
            {tags.map((tag, idx) => (
              <button
                key={idx}
                className={cn(
                  "py-2 px-5 flex items-center justify-center roboto-medium border border-black  rounded-[40px] text-center text-black",
                  place.tags.includes(tag.name) && "bg-black text-white"
                )}
                type="button"
                onClick={() => {
                  handleTagUpdate(tag.name);
                }}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      </form>
      <div className="flex  items-center justify-center mt-4">
        <button
          type="submit"
          onClick={onSubmit}
          className="py-3 w-full md:w-fit px-5 border-2 roboto-medium rounded-[12px] text-center border-black bg-black text-white"
        >
          Add Property
        </button>
      </div>
    </div>
  );
};

const AddListing = ({ placeId, refetch }) => {
  const [listing, setListing] = useState({
    placeId: placeId,
    availableDates: {
      startDate: dayjs().add(1, "day"),
      endDate: dayjs().add(1, "year"),
    },
    pricePerNight: 0,
    maxPeople: 1,
  });

  const min = dayjs().add(1, "day").format("YYYY-MM-DD");
  const max = dayjs().add(1, "year").format("YYYY-MM-DD");

  const updateListing = (obj) => {
    setListing((prev) => ({ ...prev, ...obj }));
  };

  const onSubmit = async () => {
    try {
      console.log("log payload", listing.placeId, listing.pricePerNight);
      if (!listing.placeId || !listing.pricePerNight) {
        toast.warn("Please Enter all details");
        return;
      }
      const data = {
        ...listing,
      };

      const response = await addListing(data);
      console.log("response", response?.data?.listing);
      if (response?.data?.listing) refetch?.();

      // if (response?.data?.newPlace) {
      //   onSuccess(response?.data?.newPlace);
      // }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to add new property");
    }
  };

  return (
    <div className="flex flex-col mt-3" id="place-details">
      <h4 className="text-xl roboto-medium text-black">
        Enter Listing Details
      </h4>
      <form
        id="property-form"
        onSubmit={onSubmit}
        className="mt-3 flex flex-col gap-5 md:flex-row items-start  w-full max-h-[calc(90%-100px)] overflow-y-scroll"
      >
        <div className="w-full">
          <div className="w-full">
            <label
              className="text-[10px] roboto-bold text-black uppercase"
              htmlFor="price"
            >
              Price Per Night (In Rupees)
            </label>
            <input
              id="price"
              className={cn(commonInputClassName, "py-2 mt-1")}
              type="number"
              placeholder="Enter Cost of Property per night"
              required={true}
              onChange={(e) => {
                updateListing({ pricePerNight: e.target.value });
              }}
            />
          </div>
          <div className="w-full mt-4">
            <label
              className="text-[10px] roboto-bold text-black uppercase"
              htmlFor="maxPeople"
            >
              Guest count (max limit)
            </label>
            <input
              id="maxPeople"
              className={cn(commonInputClassName, "py-2 mt-1")}
              type="number"
              placeholder="Enter Maximum number of people allowed!"
              required={true}
              onChange={(e) => {
                updateListing({ maxPeople: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="w-full flex flex-col">
            <label
              htmlFor="check-in-date"
              className="text-[10px] roboto-bold text-black uppercase"
            >
              Check-In
            </label>
            <input
              type="date"
              id="check-in-date"
              className="cursor-pointer outline-none"
              value={dayjs(listing.availableDates.startDate).format(
                "YYYY-MM-DD"
              )}
              min={min}
              max={max}
              onChange={(e) =>
                updateListing({
                  availableDates: {
                    startDate: e.target.value,
                    endDate: listing.availableDates.endDate,
                  },
                })
              }
            />
          </div>
          <div className="w-full mt-5 flex flex-col">
            <label
              htmlFor="check-in-date"
              className="text-[10px] roboto-bold text-black uppercase mt-5"
            >
              Check-Out
            </label>
            <input
              type="date"
              id="check-in-date"
              className="cursor-pointer outline-none"
              value={dayjs(listing.availableDates.endDate).format("YYYY-MM-DD")}
              min={min}
              max={max}
              onChange={(e) =>
                updateListing({
                  availableDates: {
                    endDate: e.target.value,
                    startDate: listing.availableDates.startDate,
                  },
                })
              }
            />
          </div>
        </div>
      </form>
      <div className="flex  items-center justify-center mt-4">
        <button
          type="submit"
          onClick={onSubmit}
          className="py-3 w-full md:w-fit px-5 border-2 roboto-medium rounded-[12px] text-center border-black bg-black text-white"
        >
          Add Listing
        </button>
      </div>
    </div>
  );
};

const AddListingModal = () => {
  const { modalData, onClose } = useContext(ModalContext);
  const [createdPlace, setCreatedPlace] = useState({});

  const onPropertyInsertionSuccess = (newPlace) => {
    console.log("new place", newPlace);
    setCreatedPlace(newPlace);
  };

  const onDeleteProperty = async () => {
    if (!createdPlace?._id) return;

    try {
      const response = await deleteProperty({ placeId: createdPlace?._id });
      console.log("delete property response", response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalWrapper className="fixed inset-0 flex items-end sm:items-end sm:px-0  justify-center  px-0">
      <ModalContainer className="max-w-screen max-h-[90%] sm:max-h-[90%] sm:h-full overflow-y-scroll sm:rounded-br-none sm:rounded-bl-none">
        <div className="flex items-center justify-between gap-5 pb-2 border-b">
          <h4 className="text-lg roboto-medium text-black">
            Add a New Listing
          </h4>
          <IconButton
            onClick={() => {
              if (createdPlace?._id) {
                onDeleteProperty();
              }
              onClose();
            }}
          >
            <ControlPointOutlinedIcon className="!w-8 !h-8 rotate-45 !text-custom-grey" />
          </IconButton>
        </div>
        {createdPlace?._id ? (
          <AddListing
            placeId={createdPlace._id}
            refetch={async () => {
              await modalData?.refetch?.();
              onClose();
            }}
          />
        ) : (
          <AddProperty onSuccess={onPropertyInsertionSuccess} />
        )}
      </ModalContainer>
    </ModalWrapper>
  );
};

export default AddListingModal;
