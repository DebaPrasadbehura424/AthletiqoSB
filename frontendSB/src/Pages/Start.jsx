import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { NavLink } from "react-router-dom";
import { FaUser, FaUserPlus } from "react-icons/fa";
import bgHere from "../vedios/ved2.mp4";
import Logo from "../images/ath.png";
const Start = () => {
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    const generateRandomCircles = () => {
      const circleArray = [];
      const numberOfCircles = 10;

      for (let i = 0; i < numberOfCircles; i++) {
        const size = Math.random() * (100 - 30) + 30;
        const xPos = Math.random() * window.innerWidth;
        const yPos = Math.random() * window.innerHeight;
        const animationDelay = Math.random() * 2;
        const circle = {
          size,
          xPos,
          yPos,
          animationDelay,
        };
        circleArray.push(circle);
      }
      setCircles(circleArray);
    };

    generateRandomCircles();
  }, []);

  useEffect(() => {
    if (circles.length > 0) {
      gsap.to(".circle", {
        duration: 10,
        x: "+=400",
        y: "+=300",
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [circles]);

  return (
    <div className="relative min-h-screen overflow-hidden overflow-x">
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 object-cover w-full h-full"
      >
        <source src={bgHere} type="video/mp4" />
      </video>

      <header className=" relative z-10 w-full">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center justify-center ">
            <img src={Logo} alt="logo" className="w-60 object-contain" />
          </div>
          <nav className="flex items-center space-x-6">
            <div className="hidden sm:flex space-x-6">
              <NavLink to="/login">
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold cursor-pointer shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
                  Already user
                </button>
              </NavLink>

              <NavLink to="/register">
                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold cursor-pointer shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
                  Create Account
                </button>
              </NavLink>
            </div>

            <div className="sm:hidden flex space-x-4">
              <NavLink to="/login">
                <button className="bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
                  <FaUser />
                </button>
              </NavLink>

              <NavLink to="/register">
                <button className="bg-green-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
                  <FaUserPlus />
                </button>
              </NavLink>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 relative z-10 flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-[#181818] leading-tight">
            Athletiqo: Your Health, Our Priority
          </h1>
        </div>

        <div className="absolute inset-0 z-0">
          {circles.map((circle, index) => (
            <div
              key={index}
              className="circle absolute rounded-full bg-opacity-50 cursor-pointer"
              style={{
                width: `${circle.size}px`,
                height: `${circle.size}px`,
                left: `${circle.xPos}px`,
                top: `${circle.yPos}px`,
                backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                animationDelay: `${circle.animationDelay}s`,
              }}
            ></div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Start;
