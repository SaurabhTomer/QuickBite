import { FaLocationDot } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { GiCrossMark } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import axios from "axios";

function Navbar() {
  const { userData , city } = useSelector((state) => state.user);

  // state for user info popup
  const [showInfo, setShowInfo] = useState(false);
  // state for small-screen search bar
  const [showSearch, setShowSearch] = useState(false);
  const dispatch  = useDispatch()

  //function to handle logout
  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/signout`,{withCredentials:true})
      dispatch(setUserData(null))
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="w-full h-20 flex items-center justify-between px-4 md:px-10 fixed top-0 z-9999 bg-[#fff9f6] shadow-sm">
      {/* 🔎 Mobile Search Bar (visible only when active) */}
      {showSearch && (
        <div className="w-[90%] h-[60px] flex fixed top-20 left-[5%] bg-white shadow-xl rounded-lg items-center gap-4 px-3 z-9999">
          {/* 📍 Location Section */}
          <div className="flex items-center w-[30%] gap-2 border-r border-gray-300">
            <FaLocationDot className="text-[#ff4d2d]" size={20} />
            <span className="text-gray-600 truncate">{city}</span>
          </div>

          {/* 🔍 Search Input */}
          <div className="flex items-center w-[70%] gap-2">
            <CiSearch size={20} className="text-[#ff4d2d] md:hidden" />
            <input
              type="text"
              placeholder="Search delicious food..."
              className="w-full px-2 text-gray-700 outline-none"
            />
          </div>

          {/* ❌ Close Search */}
          <GiCrossMark
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => setShowSearch(false)}
          />
        </div>
      )}

      {/* 🍔 Brand Logo */}
      <h1 className="text-3xl font-bold text-[#ff4d2d] cursor-pointer">
        QuickBite
      </h1>

      {/* 🔍 Search Bar for medium and large screens */}
      <div className="hidden md:flex md:w-[60%] lg:w-[40%] h-[60px] bg-white shadow-lg rounded-lg items-center gap-4 px-3">
        {/* 📍 Location */}
        <div className="flex items-center w-[30%] gap-2 border-r border-gray-300">
          <FaLocationDot className="text-[#ff4d2d]" size={20} />
          <span className="text-gray-600 truncate">{city}</span>
        </div>

        {/* 🔎 Search Input */}
        <div className="flex items-center w-[70%] gap-2">
          <CiSearch size={20} className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="Search delicious food..."
            className="w-full px-2 text-gray-700 outline-none"
          />
        </div>
      </div>

      {/* 🛒 Right Section — Cart, Orders, Profile */}
      <div className="flex items-center gap-4 relative">
        {/* 🛒 Cart Icon */}
        {!showSearch && (
          <div className="relative cursor-pointer">
            <FaCartShopping size={22} className="text-[#ff4d2d]" />
            <span className="absolute -right-2 -top-2 text-xs bg-[#ff4d2d] text-white rounded-full px-1">
              0
            </span>
          </div>
        )}

        {/* 📦 My Orders Button (hidden on small screens) */}
        <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium hover:bg-[#ff4d2d]/20 transition-all">
          My Orders
        </button>

        {/* 🔍 Mobile Search Toggle Icon */}
        <div className="md:hidden cursor-pointer">
          {showSearch ? (
            <GiCrossMark
              className="text-[#ff4d2d]"
              onClick={() => setShowSearch(false)}
            />
          ) : (
            <CiSearch
              className="text-[#ff4d2d]"
              size={22}
              onClick={() => setShowSearch(true)}
            />
          )}
        </div>

        {/* 👤 Profile Circle */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-lg font-semibold shadow-md cursor-pointer"
          onClick={() => setShowInfo((prev) => !prev)}
        >
         {userData?.fullName?.charAt(0).toUpperCase()}
        </div>

        {/* 💬 Profile Popup */}
        {showInfo && (
          <div className="absolute top-16 right-0 md:right-5 w-[180px] bg-white shadow-2xl rounded-xl p-4 flex flex-col gap-2 animate-fadeIn z-9999">
            <p className="text-[17px] font-semibold text-gray-800">
              {userData?.fullName}
            </p>

            {/* Only show My Orders for small screens */}
            <p className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer">
              My Orders
            </p>

            <p className="text-[#ff4d2d] font-semibold cursor-pointer hover:text-[#e64323] transition"
            onClick={handleLogout}>
              Log Out
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
