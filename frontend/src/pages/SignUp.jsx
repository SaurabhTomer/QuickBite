import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const bgColor = "#fff9f6";
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false); //  state for toggling visibility
  const [role, setRole] = useState("user"); //state for role
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border `}
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2`}
          style={{ color: primaryColor }}
        >
          QuickBite
        </h1>
        <p className="text-gray-600 mb-8">
          Create Your account to get Started with delicious food deliveries
        </p>

        {/* fullName */}
        <div className="mb-4">
          <label
            htmlFor="FullName"
            className="block text-gray-700  font-medium mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter Your Full Name"
            style={{ border: `1px solid ${borderColor}` }}
          />
        </div>

        {/* email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700  font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter Your Email"
            style={{ border: `1px solid ${borderColor}` }}
          />
        </div>

        {/* mobile */}
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-gray-700  font-medium mb-1"
          >
            Mobile
          </label>
          <input
            type="mobile"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none "
            placeholder="Enter Your Mobile Number"
            style={{ border: `1px solid ${borderColor}` }}
          />
        </div>

        {/* password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700  font-medium mb-1"
          >
            Password
          </label>
          <div className="relative ">
            <input
              type={`${!showPassword ? "password" : "text"}`}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none "
              placeholder="Enter Your Password"
              style={{ border: `1px solid ${borderColor}` }}
            />
            <button
              className="absolute right-3 top-3 text-gray-500 cursor-pointer "
              // on click on eye button it changes value of set show password ( toggle password visibility)
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        {/* role */}
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700  font-medium mb-1"
          >
            Role
          </label>
          <div className="flex gap-2 ">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                onClick={() => setRole(r)}
                style={
                  role == r
                    ? { backgroundColor: primaryColor, color: "white" }
                    : { border: `1px solid ${primaryColor}`, color: "#333" }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* signup button */}
        <button
          className={`w-full font-semibold pointer-cursor text-center bg-[#ff4d2d] text-white hover:bg-[#e64323] py-2 rounded-lg  `}
        >
          Sign Up
        </button>

        {/* signup  with google */}
        <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 hover:bg-gray-100 border-gray-400">
          <FcGoogle size={20} />
          <span>Sign Up with Google</span>
        </button>

        {/* line below that google signup */}
        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Already have an account ?{" "}
          <span className="text-[#ff4d2d]">Sign In</span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
