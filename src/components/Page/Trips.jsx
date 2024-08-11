import React, { Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";
import { getAllBookingOfUser } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { placeholder } from "../../data";
import dayjs from "dayjs";

const Trips = () => {
  const user = useContext(UserContext);
  const [trips, setTrips] = useState([]);
  const [loader, setLoader] = useState(true);

  const navigate = useNavigate();

  const getBookings = async () => {
    try {
      const data = await getAllBookingOfUser();
      console.log("trips", data);
      if (data?.data?.allBookingsOfUser)
        setTrips(data?.data?.allBookingsOfUser);
    } catch (err) {
      console.log(err);
      //   toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div className="w-screen h-full mt-[85px] px-5 sm:px-8">
      <h2 className="roboto-medium text-2xl text-black pb-4 border-b">Trips</h2>
      <Fragment>
        {loader ? (
          <div className="fixed inset-0 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <Fragment>
            {trips?.length === 0 ? (
              <div className="inline-flex flex-col items-start mt-5 pb-5 border-b">
                <h4 className="roboto-medium text-2xl text-black ">
                  No trips booked ... yet!
                </h4>
                <p className="roboto-regular text-base text-black">
                  Time to dust off your bags and start planning your next
                  adventure.
                </p>
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                  className="rounded-[10px] border-[1.9px] border-black px-6 py-3 mt-4 text-base roboto-medium"
                >
                  Start searching
                </button>
              </div>
            ) : (
              <div className=" my-5 gap-5 gap-y-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 overflow-y-scroll pb-[100px]">
                {trips.map((trip, idxx) => {
                  const listing = trip?.listing;
                  const isExpired =
                    dayjs(trip?.checkIn).diff(dayjs(), "days") < 0;

                  return (
                    <Link
                      to={"/place/" + listing?._id}
                      key={idxx}
                      className="h-fit w-full"
                    >
                      <div className="bg-gray-500 mb-2 rounded-2xl overflow-hidden flex w-full ">
                        <img
                          src={listing?.property?.photos?.[0] || placeholder}
                          alt="placeholder"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h2 className="font-bold text-black">
                        {listing?.property?.address}
                      </h2>
                      <h3 className="text-sm text-custom-grey mb-4">
                        {listing?.property?.title}
                      </h3>
                      <span className="rounded-[10px] px-5  py-2 border border-primary bg-red-100 roboto-medium text-primary text-base">
                        {isExpired
                          ? "Completed"
                          : `Upcoming (${dayjs(trip?.checkIn).format(
                              "DD MMMM YYYY"
                            )})`}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

export default Trips;
