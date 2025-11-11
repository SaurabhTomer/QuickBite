import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { useState } from "react";

function CreateEditShop() {
    const navigate = useNavigate();
    const { myShopData } = useSelector(state => state.owner)
    const { currentCity , currentState , currentAddress} = useSelector(state => state.user)

    //shop details state
    const [name,setName] = useState(myShopData?.name || "")
    const [address,setAddress] = useState(myShopData?.address || currentAddress)
    const [city,setCity] = useState(myShopData?.city || currentCity)
    const [state,setState] = useState(myShopData?.state || currentState)
   

    return (
        <div
            className="flex justify-center flex-col items-center p-6 
    bg-linear-to-br from-orange-50 to-white min-h-screen"
        >
            {/* back arrow  */}
            <div
                className="absolute top-5 left-5 z-10 mb-2.5"
                onClick={() => navigate("/")}
            >
                <IoMdArrowBack size={35} className="text-[#ff4d2d] " />
            </div>

            <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 
      border border-orange-100">

                <div className="flex flex-col items-center mb-6">
                    {/* folk  icon */}
                    <div className="bg-orange-100 p-4 rounded-full mb-4">
                        <FaUtensils className="text-[#ff4d2d] w-16 h-16" />
                    </div>
                    {/* shop label */}
                    <div className="text-3xl font-extrabold text-gray-900">
                        {myShopData ? "Edit Shop " : "Add Shop"}
                    </div>
                </div>

                <form className="space-y-5">
                    {/* Shop Name label */}
                    <div> 
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input type="text" placeholder="Enter Shop Name" 
                        className="w-full px-4 py-2 border rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-orange-500"
                        onChange={(e) => setName(e.target.value)}
                        value={(name)}/>
                    </div>
                    {/* Shop Image */}
                     <div> 
                        <label className="block text-sm font-medium text-gray-700 mb-1">Shop Image</label>
                        <input type="file"  accept="image/*"
                        className="w-full px-4 py-2 border rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    {/* City and state  */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                         <div> 
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input type="text" placeholder="Enter City" 
                        className="w-full px-4 py-2 border rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-orange-500"
                        onChange={(e) => setCity(e.target.value)}
                        value={(city)}/>
                    </div>

                     <div> 
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input type="text" placeholder="Enter State" 
                        className="w-full px-4 py-2 border rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-orange-500"
                        onChange={(e) => setState(e.target.value)}
                        value={(state)}/>
                    </div>

                    </div>
                    {/* Address */}
                      <div> 
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input type="text" placeholder="Enter shop Address" 
                        className="w-full px-4 py-2 border rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-orange-500"
                        onChange={(e) => setAddress(e.target.value)}
                        value={(address)}/>
                    </div>

                    <button className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md
                     hover:bg-orange-600 hover:shadow-lg transition-all cursor-pointer">
                        Save
                        </button>
                </form>

            </div>



        </div>
    );
}

export default CreateEditShop;
