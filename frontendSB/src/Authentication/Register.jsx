import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import registerhere from "../images/registers.jpg";
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import { RiGoogleFill } from "react-icons/ri";
const SignUpPage = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/user/userRegister",
        formData
      );

      Swal.fire({
        title: "Registration Successful!",
        text: "You have been successfully registered.",
        icon: "success",
        confirmButtonText: "Proceed",
      }).then(() => {
        const token = response.data.token;
        const userId = response.data.userId;
        cookies.set("token", token);
        cookies.set("userId", userId);
        navigate("/progress");
      });
    } catch (error) {
      console.error("Error submitting form:", error);

      Swal.fire({
        title: "Registration Failed!",
        text: "There was an error during registration. Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  // Google Register Handler
  const handleGoogleRegister = () => {
    window.location.href = "http://localhost:5000/oauth2/authorization/google";
  };

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative hidden md:flex items-end px-4 min-h-screen pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gradient-to-t from-green-500 to-blue-500 sm:px-6 lg:px-8">
          <div className="absolute inset-0">
            <img
              className="object-cover w-full h-full"
              src={registerhere}
              alt="Background"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="relative text-white text-center">
            <h3 className="text-4xl font-bold">Join the Fitness Journey</h3>
            <p className="mt-4 text-xl">
              Whether it's yoga, strength training, or wellness, start your
              journey today.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <form onSubmit={handleSubmit} className="mt-8 p-4">
              <div className="space-y-5">
                <div>
                  <label className="text-base font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <AiOutlineMail className="absolute inset-y-0 left-0 flex items-center pl-3" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email to get started"
                      className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-base font-medium text-gray-900">
                    Password
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <AiOutlineLock className="absolute inset-y-0 left-0 flex items-center pl-3" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-25 py-3 text-center text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  Submit
                </button>

                <div className="mt-3 space-y-3">
                  <button
                    type="button"
                    className="relative 
                    
                    inline-flex items-center justify-center w-full
                     px-4 py-4 text-base font-semibold text-gray-700 
                     transition-all duration-200 bg-gray-300 border-2
                      border-gray-200 rounded-md  focus:bg-gray-100
                       hover:text-black focus:text-black 
                       focus:outline-none"
                    onClick={handleGoogleRegister}
                  >
                    <div className="absolute inset-y-0 left-0 p-4">
                      <RiGoogleFill className="w-6 h-6 text-rose-500" />
                    </div>
                    Sign up with Google
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
