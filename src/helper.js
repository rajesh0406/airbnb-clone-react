import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const removeCookie = (cookieName) => {
  document.cookie = `${cookieName}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const setCookie = (name, value, expiryDay) => {
  let cookie = "";
  if (expiryDay) {
    const d = new Date();
    d.setTime(d.getTime() + expiryDay * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    cookie = name + "=" + value + ";" + expires + ";path=/";
  } else {
    cookie = name + "=" + value + ";path=/";
  }
  document.cookie = cookie;
  console.log("cookie created");
};
