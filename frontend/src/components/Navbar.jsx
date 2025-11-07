import { FaLocationDot } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";

function Navbar() {
  return (
    <div className="w-full h-20 flex items-center justify-between md:justify-center gap-[30px] fixed top-0 z-9999 bg-[#fff9f6] overflow-visible">
      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]"> QuickBite</h1>


      <div className="md:w-[60%] lg:w-[40%] h-[70px] flex bg-white shadow-xl rounded-lg items-center gap-5">
        {/* city space in nav bar */}
        <div className="flex items-center w-[30%] overflow-hidden gap-2.5 px-2.5 border-r-2 border-gray-400 ">
          <FaLocationDot className="text-[#ff4d2d]" size={20} />
          <div className="w-[80%] truncate text-gray-600">Bijnor</div>
        </div>

        {/* search space in nav bar */}
        <div className="w-[80%] flex items-center gap-2.5">
          <CiSearch size={20} className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="search delicious food..."
            className="px-2.5 text-gray-700 outline-0 w-full"
          />
        </div>
      </div>

      {/* cart section */}
      <div className="relative cursor-pointer">
        <FaCartShopping size={20} className="text-[#ff4d2d]" />
        <span className="absolute right-[-9px]   -top-3 text-[#ff4d2d] ">
          0
        </span>
      </div>

      {/* order button */}
      <button className="hidden md:block px-3 py-1 rounded-lg  bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium">
        My Orders
      </button>

        {/* profile section */}
      <div>
        
      </div>
    </div>
  );
}

export default Navbar;
