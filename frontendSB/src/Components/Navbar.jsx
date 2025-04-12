import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../images/ath.png";
import { MdDashboard } from "react-icons/md";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const options = ["Progress", "LeaderBoard", "Plans", "marketplace"];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white p-2 shadow-2xl flex justify-between items-center z-20">
      <div className="flex items-center justify-center ">
        <img src={Logo} alt="logo" className="w-40 object-contain" />
      </div>

      <div className="hidden md:flex gap-4 md:gap-8 text-zinc-800 font-bold">
        {options.map((optionText, index) => (
          <NavLink
            key={index}
            to={`/${optionText.toLowerCase()}`}
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : "text-zinc-800"
            }
          >
            {optionText}
          </NavLink>
        ))}
      </div>

      <div className="hidden md:flex">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-2 text-zinc-800 font-semibold border-2 border-blue-200 hover:bg-blue-500 hover:text-white p-2 md:p-3 rounded-lg transition duration-300 ease-in-out"
        >
          <MdDashboard className="text-xl" />
          <span>Dashboard</span>
        </NavLink>
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-zinc-800 text-2xl">
          {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-xl md:hidden z-20">
          <div className="flex flex-col gap-4 p-4 text-zinc-800 font-bold">
            {options.map((optionText, index) => (
              <NavLink
                key={index}
                to={`/${optionText.toLowerCase()}`}
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-semibold" : "text-zinc-800"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {optionText}
              </NavLink>
            ))}

            <NavLink
              to="/dashboard"
              className="flex items-center gap-2 text-zinc-800 font-semibold border-2 border-blue-200 hover:bg-blue-500 hover:text-white p-2 rounded-lg transition duration-300 ease-in-out"
              onClick={() => setIsMenuOpen(false)}
            >
              <MdDashboard className="text-xl" />
              <span>Dashboard</span>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
