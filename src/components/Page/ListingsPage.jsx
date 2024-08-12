import React, { useState, useEffect, Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteListing, getListingsOfOwner } from "../../api/api";
import Loader from "../Loader";
import { placeholder } from "../../data";
import { ModalContext } from "../Context/ModalContext";
import { toast } from "react-toastify";

const ListingPage = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loader, setLoader] = useState(true);

  const { onOpen, updateModalData } = useContext(ModalContext);

  const getMyListings = async () => {
    setLoader(true);
    try {
      const data = await getListingsOfOwner();
      console.log("listings", data?.data?.listings);
      if (data?.data?.listings) {
        setListings(data?.data?.listings);
      }
      //   if (data?.data?.reservations) {
      //     setReservation(data?.data?.reservations);
      //   }
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    }
  };

  const removeListing = async (listingId) => {
    try {
      const data = await deleteListing({ listingId });
      console.log("listings", data?.data);
      toast.success("Listing Removed Successfully!");
      getMyListings();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to remove listing!");
      console.log(err);
    }
  };

  useEffect(() => {
    getMyListings();
  }, []);

  return (
    <div className="w-screen h-full mt-[85px] px-5 sm:px-8">
      <header className="w-full justify-between border-b    pb-5 items-start flex flex-col md:flex-row sm:items-center">
        <h4 className="roboto-medium text-3xl text-black">My Listings</h4>
        <button
          onClick={() => {
            updateModalData({
              refetch: getMyListings,
            });
            onOpen("add-new-listing");
          }}
          className="py-3 mt-3 px-8 flex items-center justify-center roboto-medium  rounded-[10px] text-center border-black border-[1.5px] text-black"
        >
          Create
        </button>
      </header>
      {loader ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <Fragment>
          <div className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full my-5 mb-[100px]">
            {listings?.map((item, idx) => {
              //   console.log("item", item);
              return (
                <div
                  key={idx}
                  onClick={() => {
                    navigate(`/hosting/listing/${item?._id}`);
                  }}
                  className=" w-full"
                >
                  <div className="bg-gray-500 relative mb-2 rounded-2xl overflow-hidden flex w-full h-[290px]">
                    <img
                      src={item?.property?.photos?.[0] || placeholder}
                      alt="placeholder"
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute top-2 right-2 bg-primary px-5 roboto-medium py-2 rounded-[50px] text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeListing(item?._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  <h2 className="font-bold text-black">
                    {item?.property?.address}
                  </h2>
                  <h3 className="text-sm text-custom-grey">
                    {item?.property?.title}
                  </h3>
                  <div className="mt-1">
                    <span className="font-bold text-black">
                      ₹{item?.pricePerNight} per night
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default ListingPage;
