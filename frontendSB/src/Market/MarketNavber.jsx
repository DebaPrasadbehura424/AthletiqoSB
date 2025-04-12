import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../images/ath.png";
import { MdDashboard } from "react-icons/md";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { userContextData } from "../context/UserContext";

function MarketNavar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const options = ["Progress", "LeaderBoard", "Plans", "Marketplace"];
  const { addProduct } = useContext(userContextData);

  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);

  return (
    <nav className="bg-white p-2 border-blue-500 border-b-2 flex justify-between items-center z-20">
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
        <img src={Logo} alt="logo" className="w-40 object-contain" />
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center gap-4">
        <NavLink
          to="/cart"
          className="text-zinc-800 text-xl hover:text-blue-500 "
        >
          <span className="text-white rounded-2xl text-[15px] absolute top-2 ml-4 w-5 h-5 bg-blue-900 flex justify-center items-center ">
            {addProduct.length}
          </span>
          <AiOutlineShoppingCart className="text-2xl " />
        </NavLink>

        <NavLink
          to="/dashboard"
          className="flex items-center gap-2 text-zinc-800 font-semibold border-2 border-blue-200 hover:bg-blue-500 hover:text-white p-2 rounded-lg transition duration-300 ease-in-out"
        >
          <MdDashboard className="text-xl" />
          <span>Dashboard</span>
        </NavLink>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-zinc-800 text-2xl">
          {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
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

            {/* Dashboard Button for Mobile */}
            <NavLink
              to="/dashboard"
              className="flex items-center gap-2 text-zinc-800 font-semibold border-2 border-blue-200 hover:bg-blue-500 hover:text-white p-2 rounded-lg transition duration-300 ease-in-out"
              onClick={() => setIsMenuOpen(false)}
            >
              <MdDashboard className="text-xl" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/cart"
              className="text-zinc-800 text-xl hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-white rounded-lg text-[15px] absolute  ml-4 w-5 h-4 bg-blue-900 flex justify-center items-center ">
                {addProduct.length}
              </span>
              <AiOutlineShoppingCart className="text-2xl " />
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default MarketNavar;
