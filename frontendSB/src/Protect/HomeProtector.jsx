import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
function HomeProtector({ children }) {
  const naviagate = useNavigate(null);

  const cookies = new Cookies();
  const token = cookies.get("token");
  const userId = cookies.get("userId");

  useEffect(() => {
    if (token != null && userId != null) {
      naviagate("/progress");
    }
  }, []);
  return <>{children}</>;
}

export default HomeProtector;
