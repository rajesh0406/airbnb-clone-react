import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getLoginUserDetails } from "../../api/api";
import { removeCookie } from "../../helper";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({
  user: {},
  setUser: (obj) => {},
  ready: false,
  handleLogout: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    removeCookie("token");
    navigate("/");
  };

  useEffect(() => {
    getLoginUserDetails()
      .then((data) => {
        console.log("data", data);
        setUser(data);
        setReady(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

//Missing prop validation
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
