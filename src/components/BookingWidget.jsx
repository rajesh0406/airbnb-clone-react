import PropTypes from "prop-types";
import { useContext, useEffect, useReducer, useState, useRef } from "react";
import { differenceInCalendarDays } from "date-fns";
import { bookingPlace } from "../api/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Context/UserContext";
import dayjs from "dayjs";
import { IconButton } from "@mui/material";

import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { toast } from "react-toastify";

const GuestCounter = ({ text, subtext, current, handleAdd, handleRemove }) => {
  return (
    <div className="flex gap-5 justify-between items-center mt-4">
      <div className="flex flex-col  text-left">
        <h6 className="roboto-medium text-lg text-black">{text}</h6>
        <p className="roboto-regular text-[16px] text-black">{subtext}</p>
      </div>
      <div className="flex items-center gap-3">
        <IconButton onClick={handleRemove} className="text-custom-grey">
          <RemoveCircleOutlineOutlinedIcon
            style={{ width: "32px", height: "32px" }}
          />
        </IconButton>
        <span className="roboto-medium text-black text-base">{current}</span>
        <IconButton onClick={handleAdd} className="text-custom-grey">
          <ControlPointOutlinedIcon style={{ width: "32px", height: "32px" }} />
        </IconButton>
      </div>
    </div>
  );
};

const BookingWidget = ({ place, hasActiveBooking }) => {
  console.log("listing", place);
  const min = dayjs(place?.availableDates?.[0]?.startDate)
    .add(1, "day")
    .format("YYYY-MM-DD");
  const max = dayjs(place?.availableDates?.[0]?.endDate).format("YYYY-MM-DD");

  const maxPeople = place.maxPeople;

  const [checkIn, setCheckIn] = useState(() => min);
  const [checkOut, setCheckOut] = useState(() => max);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [diffBwDates, setDiffBwDates] = useState(0);

  const [noOfAdult, setNoOfAdult] = useState(1);
  const [noOfChildren, setNoOfChildren] = useState(0);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  useEffect(() => {
    const date1 = dayjs(checkIn);
    const date2 = dayjs(checkOut);

    setDiffBwDates(date2.diff(date1, "days"));
  }, [checkIn, checkOut]);

  // Booking Place
  const bookThisPlace = async () => {
    // const date1 = dayjs(checkIn).valueOf();
    // const date2 = dayjs(checkOut).valueOf();
    // console.log("check", date1, date2);
    // return;

    const data = {
      listing: place._id,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      numberOfAdults: noOfAdult,
      numberOfChildren: noOfChildren,
      totalPrice: diffBwDates * place.pricePerNight,
    };
    try {
      const { booking } = await bookingPlace(data);
      toast.success("Booking Successfull!");
      // const bookingId = booking._id;
      navigate("/my-trips");
      // navigate(`/account/bookings/${bookingId}`);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Booking Failed!");
    }
  };

  const handleAdd = (type) => {
    if (type === "adult") {
      setNoOfAdult((prev) => {
        let temp = prev + noOfChildren + 1;
        if (temp <= maxPeople) return prev + 1;
        return prev;
      });
    } else {
      setNoOfChildren((prev) => {
        let temp = prev + noOfAdult + 1;
        if (temp <= maxPeople) return prev + 1;
        return prev;
      });
    }
  };

  const handleRemove = (type) => {
    if (type === "adult") {
      setNoOfAdult((prev) => {
        let temp = prev - 1;
        if (temp >= 1) return temp;
        return prev;
      });
    } else {
      setNoOfChildren((prev) => {
        let temp = prev - 1;
        if (temp >= 0) return temp;
        return prev;
      });
    }
  };

  return (
    <>
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-xl font-semibold roboto-medium mb-3 text-black">
          ₹{place.pricePerNight}{" "}
          <span className="roboto-regular text-[16px]">night</span>
        </div>
        <div className="border rounded-2xl">
          <div className="flex">
            <div className="py-3 px-4">
              <label className="text-black uppercase roboto-medium text-sm">
                checkin
              </label>
              <input
                type="date"
                className="cursor-pointer outline-none"
                value={checkIn}
                min={min}
                max={max}
                onChange={(e) => {
                  console.log("check-in", e.target.value);
                  setCheckIn(e.target.value);
                }}
              />
            </div>
            <div className="py-3 px-4 border-l">
              <label className="text-black uppercase roboto-medium text-sm">
                checkout
              </label>
              <input
                type="date"
                className="cursor-pointer outline-none"
                value={checkOut}
                min={min}
                max={max}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>
          <div className="py-3 px-4 border-t">
            <GuestCounter
              text="Adult"
              subtext="Age 13+"
              current={noOfAdult}
              handleAdd={() => {
                handleAdd("adult");
              }}
              handleRemove={() => {
                handleRemove("adult");
              }}
            />
            <GuestCounter
              text="Children"
              subtext="Age Below 13"
              current={noOfChildren}
              handleAdd={() => {
                handleAdd("children");
              }}
              handleRemove={() => {
                handleRemove("children");
              }}
            />
          </div>
        </div>
        <button
          onClick={bookThisPlace}
          disabled={hasActiveBooking}
          className="primary mt-4 bg-primary rounded-[8px] w-full roboto-medium text-white px-10 py-3 disabled:opacity-70"
        >
          {hasActiveBooking ? "Already Booked!" : "Reserve"}
          {/* {diffBwDates > 0 && <span> ₹{diffBwDates * place.price}</span>} */}
        </button>
        <p className="roboto-regular font-semibold text-custom-grey text-center my-2">
          You won't be charged yet!
        </p>
        <div className="mt-4 flex justify-between items-center gap-5">
          <span className="roboto-medium text-black text-base underline underline-offset-2">
            ₹{place.pricePerNight} x {diffBwDates} nights
          </span>
          <span className="roboto-medium text-black text-base">
            ₹{place.pricePerNight * diffBwDates}
          </span>
        </div>
      </div>
    </>
  );
};

export default BookingWidget;
