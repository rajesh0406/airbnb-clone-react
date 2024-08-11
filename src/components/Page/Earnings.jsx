import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { getReservation } from "../../api/api";

const Earnings = () => {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);
  const [earnings, setEarnings] = useState(0);

  const getEarnings = async () => {
    try {
      const data = await getReservation();
      // console.log("earnings", data);
      setEarnings(
        (data?.data?.reservations || [])?.reduce((acc, curr, idx) => {
          return acc + curr?.totalPrice;
        }, 0)
      );
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    }
  };

  useEffect(() => {
    getEarnings();
  }, []);

  return (
    <div className="w-screen h-full mt-[85px] px-5 sm:px-8">
      {loader ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <Fragment>
          <div className="inline-flex flex-col items-start mt-5 pb-5 border-b w-full">
            <h4 className="roboto-medium text-3xl text-black ">Earnings</h4>
            <p className="roboto-medium mt-4 text-5xl text-black">
              You’ve made
            </p>
            <p className="roboto-medium text-5xl text-black">
              <span className="text-primary roboto-medium">₹{earnings}</span> so
              far!
            </p>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Earnings;
