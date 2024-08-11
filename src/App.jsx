import "./App.css";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./components/Page/PageNotFound";
import Home from "./components/Page/Home";
import LoginPage from "./components/Page/LoginPage";
import Layout from "./components/Layout";
import RegisterPage from "./components/Page/RegisterPage";
import { UserContextProvider } from "./components/Context/UserContext";
import Account from "./components/Page/Account";
import Places from "./components/Page/Places";
import PlacesForm from "./components/PlacesForm";
import PlacePage from "./components/Page/PlacePage";
import BookingsPage from "./components/Page/BookingsPage";
import BookingPlacePage from "./components/Page/BookingPlacePage";
import Trips from "./components/Page/Trips";

import { SearchContextProvider } from "./components/Context/SearchContext";
import { ModalProvider } from "./components/Context/ModalContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hosting from "./components/Page/Hosting";
import Earnings from "./components/Page/Earnings";
import Reservations from "./components/Page/Reservations";

function App() {
  console.log("env", import.meta.env);
  return (
    <div className="w-full h-full">
      <UserContextProvider>
        <SearchContextProvider>
          <ModalProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                {/* <Route path="/login" element={<LoginPage />} /> */}
                {/* <Route path="/register" element={<RegisterPage />} /> */}
                {/* <Route path="/account" element={<Account />} />
                <Route path="/account/places" element={<Places />} />
                <Route path="/account/places/new" element={<PlacesForm />} />
                <Route path="/account/places/:id" element={<PlacesForm />} /> */}
                <Route path="/place/:id" element={<PlacePage />} />
                <Route path="/my-trips" element={<Trips />} />
                <Route path="/hosting" element={<Hosting />} />
                <Route path="/hosting/earnings" element={<Earnings />} />
                <Route
                  path="/hosting/reservations"
                  element={<Reservations />}
                />
                {/* <Route path="/account/bookings" element={<BookingsPage />} /> */}
                {/* <Route
                  path="/account/bookings/:id"
                  element={<BookingPlacePage />}
                /> */}
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <ToastContainer autoClose={5000} />
          </ModalProvider>
        </SearchContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
