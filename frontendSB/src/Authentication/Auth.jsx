import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import { FaTimes } from "react-icons/fa";

function Auth(props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleRegister = async () => {
    try {
      await axios
        .post("http://localhost:5000/user/userRegister", { email })
        .then((res) => {
          if (res.status === 201) {
            Swal.fire({
              title: "Registration Successful!",
              text: "You have been successfully registered.",
              icon: "success",
              confirmButtonText: "Proceed",
            });
            const token = res.data.token;
            const userId = res.data.userId;
            cookies.set("token", token);
            cookies.set("userId", userId);
            navigate("/progress");
          }
        })
        .catch((error) => {
          console.error("Error during user registration:", error);
          navigate("/");
        });
    } catch (error) {
      console.error("Error during user check or registration:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/oauth2", { withCredentials: true })
      .then((res) => {
        let userEmail = res.data.email;
        userEmail = userEmail.includes("@gmail.com")
          ? userEmail
          : `${userEmail}@gmail.com`;
        setEmail(userEmail);
      })
      .catch((error) => {
        console.error("Error during OAuth2:", error);
        navigate("/");
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
            Welcome to Our App!
          </h2>
          <FaTimes
            onClick={() => navigate("/")}
            className="text-gray-700 cursor-pointer"
          />
        </div>
        <p className="text-gray-600 mb-6 text-center">
          By registering through your Google account, you are ensuring a smooth
          and secure experience with us. We take your privacy seriously and are
          committed to providing a trusted platform.
        </p>
        <div className="text-center">
          <button
            onClick={handleRegister}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
