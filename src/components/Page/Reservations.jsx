import React, {
  useState,
  useEffect,
  Fragment,
  useContext,
  useMemo,
} from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { getReservation } from "../../api/api";
import Loader from "../Loader";
import { UserContext } from "../Context/UserContext";
import { cn } from "../../helper";
import dayjs from "dayjs";
import { placeholder } from "../../data";

const options = [
  { id: "upcoming", text: "Upcoming" },
  { id: "completed", text: "Completed" },
  { id: "all", text: "All" },
];

const Reservations = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [loader, setLoader] = useState(true);
  const [reservations, setReservation] = useState([]);
  const [filter, setFilter] = useState("upcoming");

  const list = useMemo(() => {
    switch (filter) {
      case "upcoming":
        let upcoming = reservations.filter((_, idx) => {
          let diff = dayjs(_?.checkIn).diff(dayjs(), "days");
          return diff >= 0;
        });
        return upcoming;

      case "completed":
        let completed = reservations.filter((_, idx) => {
          let diff = dayjs(_?.checkIn).diff(dayjs(), "days");
          return diff < 0;
        });
        return completed;

      default:
        return reservations;
    }
  }, [filter, reservations]);

  const getAllReservation = async () => {
    try {
      const data = await getReservation();
      console.log("reservations", data?.data?.reservations);
      if (data?.data?.reservations) {
        setReservation(data?.data?.reservations);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    }
  };

  useEffect(() => {
    getAllReservation();
  }, []);

  console.log("list", list);

  return (
    <div className="w-screen h-full mt-[85px] px-5 sm:px-8">
      {loader ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <Fragment>
          <div className="inline-flex flex-col items-start w-full">
            <header className="w-full justify-between border-b    pb-5 items-start flex flex-col md:flex-row sm:items-center">
              <h4 className="roboto-medium text-3xl text-black">
                Welcome, {user?.name}
              </h4>
              <button
                onClick={() => navigate("/hosting/my-listings")}
                className="py-3 mt-3 px-8 flex items-center justify-center roboto-medium  rounded-[10px] text-center border-black border-[1.5px] text-black"
              >
                Go to Listings
              </button>
            </header>
            <div className="flex flex-col mt-4">
              <h5 className="roboto-medium text-xl text-black first-letter:uppercase">
                your reservations
              </h5>
              <div className="flex items-center gap-3 mt-3">
                {options.map((opt, idx) => (
                  <button
                    className={cn(
                      "py-2 px-5 flex items-center justify-center roboto-medium border border-black  rounded-[40px] text-center text-black",
                      filter === opt?.id && "bg-black text-white"
                    )}
                    onClick={() => {
                      setFilter(opt.id);
                    }}
                    key={idx}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 w-full mt-5 mb-28">
                {list?.map((item, idx) => {
                  //   console.log("item", item);
                  return (
                    <Link
                      to={"/hosting/listing/" + item.listing._id}
                      key={idx}
                      className=" w-full"
                    >
                      <div className="bg-gray-500 mb-2 rounded-2xl overflow-hidden flex w-full h-[290px]">
                        <img
                          src={
                            item.listing.property?.photos?.[0] || placeholder
                          }
                          alt="placeholder"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h2 className="font-bold text-black">
                        {item.listing.property.address}
                      </h2>
                      <div className="flex gap-3 items-center justify-start  mt-[15px] border-t border-b py-4">
                        <div className="flex flex-col gap-[2px]">
                          <h5 className="roboto-medium text-base text-black first-letter:uppercase">
                            {item?.guest?.name} (Guest)
                          </h5>
                          <p className="roboto-regular text-custom-grey text-[12px] first-letter:uppercase">
                            Email:{" "}
                            <span className="roboto-medium">
                              {item?.guest?.email}
                            </span>
                          </p>
                          <p className="roboto-regular text-custom-grey text-[12px] first-letter:uppercase">
                            Contact:{" "}
                            <span className="roboto-medium">
                              {item?.guest?.mobile}
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Reservations;
