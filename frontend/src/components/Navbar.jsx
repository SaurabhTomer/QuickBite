import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { serverUrl } from "../App";
import {  setUserData } from "../redux/userSlice";
import { FaPlus } from "react-icons/fa6";
import { TbReceipt2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
function Navbar() {
  //data immported from redux user slice
  const { userData, currentCity  } = useSelector(
    (state) => state.user
  );
  const { myShopData } = useSelector((state) => state.owner);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  //dispatch to store data in redux store
  const dispatch = useDispatch();
  //used ot navigate
  const navigate = useNavigate();
  //handle logout
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setUserData(null));
    }
  };

  // const handleSearchItems = async () => {
  //   try {
  //     const result = await axios.get(
  //       `${serverUrl}/api/item/search-items?query=${query}&city=${currentCity}`,
  //       { withCredentials: true }
  //     );
  //     dispatch(setSearchItems(result.data));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (query) {
  //     handleSearchItems();
  //   } else {
  //     dispatch(setSearchItems(null));
  //   }
  // }, [query]);
  return (
    <div className="w-full h-20 flex items-center justify-between md:justify-center gap-[30px] px-5 fixed top-0 z-9999 bg-[#fff9f6] overflow-visible">
      {showSearch && userData?.role == "user" && (
        <div className="w-[90%] h-[70px]  bg-white shadow-xl rounded-lg items-center gap-5 flex fixed top-20 left-[5%] md:hidden">
          <div className="flex items-center w-[30%] overflow-hidden gap-2.5 px-2.5 border-r-2 border-gray-400">
            <FaLocationDot size={25} className=" text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{currentCity}</div>
          </div>
          <div className="w-[80%] flex items-center gap-2.5">
            <IoIosSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="search delicious food..."
              className="px-2.5 text-gray-700 outline-0 w-full"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">QuickBite</h1>
      {userData?.role == "user" && (
        <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-5 hidden md:flex">
          <div className="flex items-center w-[30%] overflow-hidden gap-2.5 px-2.5 border-r-2 border-gray-400">
            <FaLocationDot size={25} className=" text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{currentCity}</div>
          </div>
          <div className="w-[80%] flex items-center gap-2.5">
            <IoIosSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="search delicious food..."
              className="px-2.5 text-gray-700 outline-0 w-full"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        {userData?.role == "user" &&
          (showSearch ? (
            <RxCross2
              size={25}
              className="text-[#ff4d2d] md:hidden"
              onClick={() => setShowSearch(false)}
            />
          ) : (
            <IoIosSearch
              size={25}
              className="text-[#ff4d2d] md:hidden"
              onClick={() => setShowSearch(true)}
            />
          ))}
        {userData?.role == "owner" ? (
          <>
          </>
        ) : ( 
          <>
          </>
        )} 

        <div
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {userData?.fullName?.slice(0, 1) || ""}
        </div>
        {showInfo && (
          <div
            className={`fixed top-20 right-2.5 md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-5 flex flex-col gap-2.5 z-9999`}
          >
            <div className="text-[17px] font-semibold">{userData?.fullName}</div>

            <div
              className="text-[#ff4d2d] font-semibold cursor-pointer"
              onClick={handleLogOut}
            >
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
