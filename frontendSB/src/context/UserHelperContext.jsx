import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const userHelperContextData = createContext(null);

const UserHelperContext = ({ children }) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:5000/user/getUserDetails`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setUserData(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, [token]);

  return (
    <userHelperContextData.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {children}
    </userHelperContextData.Provider>
  );
};

export { userHelperContextData, UserHelperContext };
