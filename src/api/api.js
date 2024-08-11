import axios from "axios";

const headers = new Headers({});
headers.append("Content-Type", "application/json");

//***************** REGISTER USER *************/
export const registerUser = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/user/register`,
      data
    );
    if (response.status === 200 || response.status === 201) {
      const resData = await response.data;
      return resData;
    } else {
      // If the response status is not success (200 or 201), throw an error
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

//***************** LOGIN USER *******************/
export const loginUser = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/user/login`,
      data
    );

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

//***************** GET LOGIN USER DETAILS *************/
export const getLoginUserDetails = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/user/profile`,
      { headers: headers }
    );

    const resData = await response.data;
    return resData;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

//***************** IMAGE UPLOAD BY LINK *************/
export const imageUpload = async (link) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/image/upload-by-link`,
      { link }
    );

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

//***************** IMAGE UPLOAD FROM DEVICE *************/
export const imageUploadFromDevice = async (formData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

//***************** ADD NEW PLACE *************/
export const addNewPlace = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/place/add-new-place`,
      data
    );

    if (response.status === 201 || response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

//********* ALL ADDED PLACE SHOW *************/
export const allAddedPlaces = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.BACKEND_ENDPOINT}/api/place/added-places`
    );

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//**************** GET PLACES BY ID ***********/
export const getPlacesById = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/place/places/${id}`
    );

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//**************** UPDATE PLACES ***********/
export const updatePlace = async (id, data) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/place/updatePlace`,
      { id, ...data }
    );
    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//********* GET ALL ADDED PLACES (BY ALL USER) ********/
export const getAllAddedPlaces = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/place/all-added-places`,
      {
        headers: headers,
      }
    );

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//********* GET ALL ADDED PLACES (BY ALL USER) ********/
export const getAllListedPlaces = async (search, tags) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_ENDPOINT
      }/api/listing/all-listings?search=${search}&tags=${tags}`,
      {
        headers: headers,
      }
    );

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//************ BOOKING NEW PLACE *************/
export const bookingPlace = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/book/bookings`,
      data
    );

    if (response.status === 201) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//************ GET ALL BOOKINGS OF USER *************/
export const getAllBookingOfUser = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/book/getBookings`,
      { headers: headers }
    );
    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//******* GET BOOKING DETAILS (BY BOOKING ID) *********/
export const getBookingDetails = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/book/getBooking/${id}`
    );

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getListingById = async (id) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_ENDPOINT
      }/api/listing/listing-of-id/${id}`,
      { headers: headers }
    );

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getReviewsOfListing = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/review/reviews/${id}`,
      { headers: headers }
    );

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const addReview = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/review/add-review`,
      data
    );

    if (response.status === 201) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getUserBookingOnListing = async (id) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_ENDPOINT
      }/api/book/getBookingOnListing/${id}`,
      { headers: headers }
    );

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getReservation = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/book/reservations`,
      { headers: headers }
    );

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getListingsOfOwner = async () => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_ENDPOINT
      }/api/listing/all-listings-of-user`,
      { headers: headers }
    );

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexpected Error Occurred!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
