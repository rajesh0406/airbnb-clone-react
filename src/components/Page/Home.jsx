import { Fragment, useContext, useEffect, useState } from "react";
import { getAllAddedPlaces, getAllListedPlaces } from "../../api/api";
import { Link } from "react-router-dom";
import { placeholder, tags as filters } from "../../data";
import { cn } from "../../helper";
import { SearchContext } from "../Context/SearchContext";
import Loader from "../Loader";

const Filter = ({ tags, handleSelect, selected }) => {
  return (
    <div className="flex items-center border-b bg-white fixed justify-between gap-10 overflow-x-scroll top-[73px] w-full px-5 transition-all">
      {tags.map((tag, idx) => (
        <button
          className={cn(
            "flex flex-col gap-[6px] justify-center items-center py-3 box-border  text-custom-grey hover:text-black",
            selected === tag?.name && "border-b border-b-black"
          )}
          key={idx}
          onClick={() => {
            handleSelect(tag.name);
          }}
        >
          <img
            src={tag?.icon}
            alt={tag?.name}
            className={cn("w-6 h-6", !selected && "opacity-70")}
          />
          <span className=" whitespace-nowrap text-[14px]">{tag.name}</span>
        </button>
      ))}
    </div>
  );
};
const Home = () => {
  const [listings, setListings] = useState([]);
  const [appliedFilter, setAppliedFilter] = useState(filters[0].name);
  const { search } = useContext(SearchContext);
  const [loader, setLoader] = useState(true);

  //Fetch all added places
  const fetchAllAddedPlaces = async () => {
    setLoader(true);
    try {
      const data = await getAllListedPlaces(search, appliedFilter);
      console.log("data", data);
      if (data?.data?.listings) setListings([...data.data.listings]);
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchAllAddedPlaces();
  }, [search, appliedFilter]);

  return (
    <div className="w-screen h-full mt-[35px]">
      <Filter
        tags={filters}
        handleSelect={(tag) => {
          setAppliedFilter(tag);
        }}
        selected={appliedFilter}
      />
      {loader ? (
        <div className="flex w-screen h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <Fragment>
          {listings.length > 0 ? (
            <div className="px-5 sm:px-6 my-[150px] gap-5 gap-y-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
              {listings.map((listing, index) => {
                return (
                  <Link
                    to={"/place/" + listing._id}
                    key={index}
                    className=" w-full"
                  >
                    <div className="bg-gray-500 mb-2 rounded-2xl overflow-hidden flex w-full h-[290px]">
                      <img
                        src={listing.property?.photos?.[0] || placeholder}
                        alt="placeholder"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="font-bold text-black">
                      {listing.property.address}
                    </h2>
                    <h3 className="text-sm text-custom-grey">
                      {listing.property.title}
                    </h3>
                    <div className="mt-1">
                      <span className="font-bold text-black">
                        ₹{listing.pricePerNight} per night
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center w-screen h-screen px-5">
              <span className="max-w-[400px] w-full rounded-[10px] font-bold bg-[#ccc] text-center p-3 text-black">
                No Listing Available!
              </span>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Home;
