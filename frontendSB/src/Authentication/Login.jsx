import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineMail, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FiLock } from "react-icons/fi";
import { RiGoogleFill } from "react-icons/ri";
import loginImages from "../images/login.jpg";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const cookies = new Cookies();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Please fill in both fields",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/user/userLogin",
        { email, password }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back to your account.",
        }).then(() => {
          const token = response.data.token;
          const userId = response.data.userId;

          cookies.set("token", token);
          cookies.set("userId", userId);
          navigate("/progress");
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: "Invalid email or password. Please try again.",
      });
      console.error("Login failed:", err);
    }
  };

  const handleLoginByGoogle = async () => {
    try {
      const emailRetrive = await axios.get("http://localhost:5000/oauth2", {
        withCredentials: true,
      });
      const email = emailRetrive.data.email;

      const response = await axios.post(
        "http://localhost:5000/user/userLoginByOauth",
        { email: email }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back to your account.",
        }).then(() => {
          const token = response.data.token;
          const userId = response.data.userId;
          cookies.set("token", token);
          cookies.set("userId", userId);
          navigate("/progress");
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: "Invalid email or password. Please try again.",
      });
      console.error("Login failed:", err);
    }
  };

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative hidden md:flex items-end px-4 min-h-screen pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
          <div className="absolute inset-0">
            <img
              className="object-cover  w-full h-full"
              src={loginImages}
              alt="Fitness"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

          <div className="relative">
            <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
              <h3 className="text-4xl font-bold text-white">
                Join 35k+ Health Enthusiasts &{" "}
                <br className="hidden xl:block" />
                Kickstart Your Fitness Journey
              </h3>
              <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                {/* Feature List */}
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                    <FaCheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-lg font-medium text-white">
                    Personalized Yoga Plans
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                    <FaCheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-lg font-medium text-white">
                    Fitness Tracking & Insights
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                    <FaCheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-lg font-medium text-white">
                    Expert Health Tips
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                    <FaCheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-lg font-medium text-white">
                    Workout Routines for All Levels
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side Section */}
        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto  p-4">
            <h1 className="text-2xl font-bold mt-6">
              Welcome Back! Ready to Dive In?
            </h1>
            <p className="mt-2 text-base text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                onClick={() => navigate("/register")}
                className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
              >
                Sign Up
              </a>
            </p>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label className="text-base font-medium text-gray-900">
                    Email Address
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <AiOutlineMail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleEmailChange}
                      className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-base font-medium text-gray-900">
                    Password
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FiLock className="w-5 h-5" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={handlePasswordChange}
                      className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <AiFillEyeInvisible className="w-5 h-5" />
                      ) : (
                        <AiFillEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center 
                    justify-center w-full px-4 py-4 
                    text-base font-semibold text-white 
                    transition-all duration-200 border 
                    border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 
                    focus:outline-none hover:opacity-80 focus:opacity-80"
                  >
                    Continue with your Gmail
                  </button>
                </div>
              </div>
            </form>

            {/* Social Login */}
            <div className="mt-3 space-y-3">
              <button
                onClick={handleLoginByGoogle}
                type="button"
                className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
              >
                <div className="absolute inset-y-0 left-0 p-4">
                  <RiGoogleFill className="w-6 h-6 text-rose-500" />
                </div>
                login with Google
              </button>
            </div>

            <p className="mt-5 text-sm text-gray-600">
              This site is protected by reCAPTCHA and the Google{" "}
              <a
                href="#"
                className="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700"
              >
                Privacy Policy
              </a>{" "}
              &{" "}
              <a
                href="#"
                className="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700"
              >
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
