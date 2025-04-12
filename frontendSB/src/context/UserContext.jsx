import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

const userContextData = createContext(null);

const UserContext = ({ children }) => {
  const cookies = new Cookies();
  const userId = cookies.get("userId");
  const [addProduct, setAddProduct] = useState([]);

  const addpoints = async (points) => {
    try {
      await axios
        .patch(`http://localhost:5000/goals/addPoints/${userId}/${points}`)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Points Updated",
              text: `${points} points have been added to your total.`,
            });
          }
        });
    } catch (error) {
      console.error("Error adding points:", error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong while adding points.",
      });
    }
  };

  useEffect(() => {
    if (userId != undefined) {
      axios
        .get(`http://localhost:5000/shops/getAll/${userId}`)
        .then((res) => {
          if (res.status === 200) {
            setAddProduct(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <userContextData.Provider
      value={{
        addProduct,
        setAddProduct,
        addpoints,
      }}
    >
      {children}
    </userContextData.Provider>
  );
};

export { UserContext, userContextData };
