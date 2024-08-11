import React, { Fragment } from "react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./Context/UserContext";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import Logout from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import PaidTwoToneIcon from "@mui/icons-material/PaidTwoTone";
import HouseSidingTwoToneIcon from "@mui/icons-material/HouseSidingTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import ChevronLeftTwoToneIcon from "@mui/icons-material/ChevronLeftTwoTone";

import { SearchContext } from "./Context/SearchContext";
import { cn } from "../helper";
import { ModalContext } from "./Context/ModalContext";

const options = {
  "logged-in": {
    hosting: {
      pre: [
        {
          id: "reservations",
          text: "Reservations",
          url: "/hosting",
        },
        {
          id: "earnings",
          text: "Earnings",
          url: "/hosting/earnings",
        },
        {
          id: "listings",
          text: "Listings",
          url: "/hosting/my-listings",
        },
      ],
      post: [
        {
          id: "accounts",
          text: "My account",
          url: "/profile",
        },
      ],
    },
    default: {
      pre: [
        {
          id: "explore",
          text: "Explore",
          url: "/",
        },
        {
          id: "trips",
          text: "Trips",
          url: "/my-trips",
        },
        // {
        //   id: "wishlists",
        //   text: "Wishlists",
        //   url: "/my-wishlists",
        // },
      ],
      post: [
        {
          id: "accounts",
          text: "My account",
          url: "/profile",
        },
      ],
    },
  },
  "not-logged-in": {
    hosting: {
      pre: [],
      post: [],
    },
    default: {
      pre: [],
      post: [],
    },
  },
};

const bottomNavOptions = {
  default: [
    {
      id: "explore",
      icon: SearchIcon,
      text: "Explore",
      url: "/",
    },
    // {
    //   id: "wishlists",
    //   icon: FavoriteBorderIcon,
    //   text: "Wishlists",
    //   url: "/my-wishlists",
    // },
    {
      id: "trips",
      text: "Trips",
      icon: LoyaltyIcon,
      url: "/my-trips",
    },
    {
      id: "profile",
      text: "Profile",
      icon: AccountCircleTwoToneIcon,
      url: "/profile",
    },
  ],
  hosting: [
    {
      id: "reservations",
      text: "Reservations",
      icon: LoyaltyIcon,
      url: "/hosting",
    },
    {
      id: "earnings",
      text: "Earnings",
      icon: PaidTwoToneIcon,
      url: "/hosting/earnings",
    },
    {
      id: "listings",
      text: "Listings",
      icon: HouseSidingTwoToneIcon,
      url: "/hosting/my-listings",
    },
    {
      id: "profile",
      text: "Profile",
      icon: AccountCircleTwoToneIcon,
      url: "/profile",
    },
  ],
};

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { user, handleLogout } = useContext(UserContext);
  const { updateSearch } = useContext(SearchContext);
  const { onOpen } = useContext(ModalContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const isHosting = pathname.includes("hosting");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (id, url) => {
    navigate(url);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    onOpen("auth");
  };
  return (
    <Fragment>
      <header className="px-4 py-3 flex justify-between fixed left-0 right-0 top-0 border-b z-[1000] bg-white">
        <Link
          to={"/"}
          className={cn(
            "hidden sm:flex items-center gap-1",
            pathname !== "/" && "hidden sm:hidden"
          )}
        >
          <img src="./vite.png" className="w-5 h-5" />
          <span className="font-bold text-xl text-primary">airbnb</span>
        </Link>
        {pathname !== "/" && (
          <IconButton onClick={() => navigate(-1)}>
            <ChevronLeftTwoToneIcon color="inherit" />
          </IconButton>
        )}
        <div
          className={cn(
            "w-full px-2 gap-2 flex h-full items-center justify-between overflow-hidden max-w-[500px] rounded-[80px] [box-shadow:0_3px_12px_0_rgba(0,0,0,0.1),_0_1px_2px_0_rgba(0,0,0,0.08)]",
            pathname !== "/" && "!hidden sm:!hidden"
          )}
        >
          <input
            type="text"
            className="pl-2 border-none py-3 w-full outline-none text-[#222222]"
            placeholder="Enter place name"
            onChange={(e) => {
              updateSearch(e.target.value);
            }}
          />
          <button className="flex items-center justify-center h-8 w-8 shrink-0 rounded-[100px] bg-primary text-white">
            <SearchIcon
              color="inherit"
              style={{ width: "20px", height: "20px" }}
            />
          </button>
        </div>

        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          style={{ border: "1px solid #dddddd", borderRadius: "40px" }}
          className="sm:!flex gap-[10px] p-2 w-[90px] !hidden text-black"
        >
          <MenuIcon />
          <AccountCircleTwoToneIcon color="inherit" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          style={{ width: "!250px" }}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          className="hidden md:block"
        >
          {options[!!user ? "logged-in" : "not-logged-in"][
            isHosting ? "hosting" : "default"
          ]["pre"]?.map((option, idx) => (
            <MenuItem
              key={idx}
              onClick={(e) => {
                handleClick(e);
                handleSelect(option.id, option.url);
              }}
            >
              {option.text}
            </MenuItem>
          ))}
          {options[!!user ? "logged-in" : "not-logged-in"][
            isHosting ? "hosting" : "default"
          ]["post"]?.length > 0 && <Divider />}

          {options[!!user ? "logged-in" : "not-logged-in"][
            isHosting ? "hosting" : "default"
          ]["post"]?.map((option, idx) => (
            <MenuItem
              key={idx}
              onClick={(e) => {
                handleClick(e);
                handleSelect(option.id, option.url);
              }}
            >
              {option.text}
            </MenuItem>
          ))}
          <MenuItem
            onClick={() => {
              user ? handleLogout() : handleLogin();
            }}
            className="!text-black"
          >
            {!!user && (
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
            )}
            {user ? "Logout" : "Login"}
          </MenuItem>
        </Menu>
      </header>

      {!isHosting && !!user && (
        <div className="fixed left-0 right-0 bottom-0 z-40 px-5 pb-[80px] sm:pb-5 flex justify-center w-full">
          <button
            onClick={() => navigate("/hosting")}
            className="py-3 px-8 flex items-center justify-center roboto-medium  rounded-[40px] text-center bg-black text-white"
          >
            Switch to hosting
          </button>
        </div>
      )}
      <nav
        className={cn(
          "fixed left-0 right-0 z-50 bottom-0 border-t px-5 py-3 bg-white flex items-center justify-around gap-2 sm:hidden",
          !user && "justify-end"
        )}
      >
        {user ? (
          <Fragment>
            {bottomNavOptions[isHosting ? "hosting" : "default"].map(
              ({ icon: Icon, id, text, url }, idx) => (
                <Link
                  to={url}
                  key={idx}
                  className={cn(
                    "flex flex-col gap-1 items-center justify-center cursor-pointer text-custom-grey",
                    pathname === url && "text-black"
                  )}
                >
                  <Icon color="inherit" />
                  <span className="text-inherit text-[0.625rem] leading-[0.75rem]">
                    {text}
                  </span>
                </Link>
              )
            )}
          </Fragment>
        ) : (
          <Fragment>
            <div
              className={cn(
                "flex flex-col gap-1 items-center justify-center cursor-pointer text-custom-grey"
              )}
              onClick={handleLogin}
            >
              <AccountCircleTwoToneIcon color="inherit" />
              <span className="text-inherit text-[0.625rem] leading-[0.75rem]">
                Profile
              </span>
            </div>
          </Fragment>
        )}
      </nav>
    </Fragment>
  );
};

export default Header;
