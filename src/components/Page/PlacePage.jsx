import { useLocation, useParams } from "react-router-dom";
import {
  getListingById,
  getPlacesById,
  getReviewsOfListing,
  getUserBookingOnListing,
} from "../../api/api";
import { useContext, useEffect, useMemo, useState } from "react";
import BookingWidget from "../BookingWidget";
import { placeholder } from "../../data";
import dayjs from "dayjs";

import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { ModalContext } from "../Context/ModalContext";
import { UserContext } from "../Context/UserContext";
import { cn } from "../../helper";

export const ReviewCard = ({ review }) => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-3 items-center">
        <img
          src={review?.reviewer?.profileImage || placeholder}
          alt="placeholder"
          className="w-10 h-10 flex-shrink-0 rounded-[100px]"
        />
        <div className="flex flex-col">
          <h6 className="text-black roboto-medium text-lg leading-5">
            {review?.reviewer?.name}
          </h6>
          <p className="text-black roboto-regular text-sm">
            member since{" "}
            {dayjs(review?.reviewer?.createdAt).format("DD MMMM YYYY")}
          </p>
        </div>
      </div>

      <div className="flex items-center mt-4 text-black">
        {!!review?.rating &&
          Array(review?.rating)
            .fill(0)
            .map((_, idx) => (
              <StarOutlinedIcon
                color="inherit"
                style={{ width: "16px", height: "16px" }}
                key={idx}
              />
            ))}
      </div>

      <p className="text-black text-base mt-1">{review?.comment}</p>
    </div>
  );
};

const PhotoGrid = ({ images }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[500px] w-full rounded-2xl overflow-hidden">
      <img
        src={images?.[0] || placeholder}
        alt="grid hero image"
        className="w-full h-full object-cover aspect-square"
      />
      <div className="grid-cols-2 grid-rows-2 gap-2 hidden md:grid">
        {Array(4)
          .fill(0)
          .map((_, idx) => (
            <img
              src={images?.[idx + 1] || placeholder}
              key={idx}
              className="w-full h-full object-cover aspect-square"
              alt={`grid-${idx + 1} image`}
            />
          ))}
      </div>
    </div>
  );
};

const PlacePage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [booking, setBooking] = useState(null);

  const { onOpen, updateModalData } = useContext(ModalContext);
  const { user } = useContext(UserContext);

  const fromHosting = pathname.includes("hosting");

  const hasActiveBooking = useMemo(() => {
    // console.log("booking", booking);
    let temp = booking?.[0]?.checkOut;
    if (temp) {
      temp = dayjs(temp);
      let diff = dayjs(temp).diff(dayjs(), "days");
      return diff >= 0;
    }
    return false;
  }, [booking]);

  //Fetch places from ID
  const fetchPlaceById = async (id) => {
    try {
      const data = await getListingById(id);
      // console.log("current place", data);
      if (data.data.listing) setPlace(data.data.listing);
    } catch (err) {
      console.log(err);
    }
  };

  const getReviews = async (id) => {
    try {
      const data = await getReviewsOfListing(id);
      if (data.data.reviews) setReviews(data.data.reviews);
      // console.log("current place reviews", data);
    } catch (err) {
      console.log(err);
    }
  };

  const getBooking = async (id) => {
    try {
      const data = await getUserBookingOnListing(id);
      // console.log("booking", data);
      setBooking(data?.data?.bookingOnListing);
    } catch (err) {
      console.log("failed to fetch booking", err);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    Promise.allSettled([fetchPlaceById(id), getReviews(id)]);
  }, [id]);

  useEffect(() => {
    if (!!user) {
      getBooking(id);
    }
  }, [user]);

  if (!place) return "";

  return (
    <div className="my-12  bg-gray-100 px-6 pt-8 h-full max-w-[1120px] w-full mx-auto">
      <h1 className="roboto-bold text-2xl not-italic font-bold leading-[28px] text-black mb-5 hidden sm:block">
        {place?.property?.title}
      </h1>

      <PhotoGrid images={place?.property?.photos || []} />
      <div className="mt-5 mb-6 flex flex-col md:flex-row gap-10">
        <div className="flex flex-col">
          <h1 className="roboto-bold text-2xl not-italic font-bold leading-[28px] text-black mb-4 sm:hidden block">
            {place?.property?.title}
          </h1>
          <h3 className="roboto-regular text-black text-base">
            {place?.property?.address}
          </h3>
          <p className="roboto-regular text-dark-black text-[12px] mt-1">
            {place.maxPeople} Guests{" "}
            <span className="roboto-medium">(max limit)</span>
          </p>
          <div className="flex gap-5 items-center justify-start  mt-[15px] border-t border-b py-4">
            {place?.property?.photos?.[0] && (
              <img
                src={place?.property?.photos?.[0]}
                alt={"host-image"}
                className="flex-shrink-0 w-10 h-10 object-cover rounded-[100px]"
              />
            )}
            <div className="flex flex-col gap-[2px]">
              <h5 className="roboto-medium text-base text-black first-letter:uppercase">
                hosted by {place?.property?.owner?.name}
              </h5>
              <p className="roboto-regular text-custom-grey text-[12px] first-letter:uppercase">
                member since{" "}
                {dayjs(place.property?.owner?.createdAt).format("DD MMMM YYYY")}
              </p>
            </div>
          </div>
          <p className="text-black roboto-regular text-lg mt-5 pb-8 border-b">
            {place?.property?.description}
          </p>
          {(place?.property?.amenities || [])?.length !== 0 && (
            <div className="flex flex-col gap-2 mt-4">
              <h5 className="text-black text-lg roboto-medium">
                What this place offers
              </h5>
              <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {place?.property?.amenities?.map((amenity, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-primary"
                  >
                    <CheckCircleTwoToneIcon
                      color="inherit"
                      style={{ width: "30px", height: "30px" }}
                    />
                    <span className="text-black roboto-regular text-base">
                      {amenity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={cn(fromHosting && "opacity-40")}>
          <BookingWidget
            place={place}
            hasActiveBooking={hasActiveBooking}
            disableClick={fromHosting}
          />
        </div>
      </div>
      {reviews.length !== 0 && (
        <div className="flex flex-col gap-5 bg-gray-100 my-10">
          <h2 className="roboto-medium text-xl text-black border-t pt-4">
            Reviews
          </h2>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
            {reviews?.slice(0, 4).map((review, idx) => (
              <ReviewCard review={review} key={idx} />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-start w-full mb-8 gap-3">
        {!fromHosting && (
          <button
            className="py-3 px-5 border-2 rounded-[12px] text-center border-black bg-black text-white"
            onClick={() => {
              if (!user) {
                onOpen("auth");
                return;
              }
              updateModalData({ listing: id, refetch: () => getReviews(id) });
              onOpen("add-review");
            }}
          >
            Add Review
          </button>
        )}

        {reviews?.length > 4 && (
          <button
            className="py-3 px-5 border-2 rounded-[12px] text-center font-semibold border-black  text-black"
            onClick={() => {
              if (!user) {
                onOpen("auth");
                return;
              }
              updateModalData({ reviews });
              onOpen("all-reviews");
            }}
          >
            Show all {reviews?.length} reviews
          </button>
        )}
      </div>
    </div>
  );
};

export default PlacePage;
