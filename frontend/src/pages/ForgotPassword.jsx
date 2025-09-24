import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "./../../node_modules/axios/lib/axios";
import { serverUrl } from "./../config";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      console.log(result);
      setStep(2);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log(result);
      setStep(3);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetPassword = async () => {
    try {
      if (newPassword != confirmPassword) {
        return null;
      } else {
        const result = await axios.post(
          `${serverUrl}/api/auth/reset-password`,
          { email, newPassword },
          { withCredentials: true }
        );
        console.log(result);
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4 
    bg-[#fff9f6]"
    >
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex gap-4 items-center mb-4">
          <IoIosArrowRoundBack
            onClick={() => navigate("/signin")}
            className="text-[#ff4d2d] cursor-pointer"
            size={30}
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>

        {step == 1 && (
          <div>
            {/* email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none  "
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            {/* send otp button */}
            <button
              onClick={handleSendOtp}
              className={`w-full font-semibold py-2 rounded-lg transition 
                duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
            >
              Send Otp
            </button>
          </div>
        )}

        {step == 2 && (
          <div>
            {/* otp */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                OTP
              </label>
              <input
                type="email"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none  "
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>

            {/* send otp button */}
            <button
              onClick={handleVerifyOtp}
              className={`w-full font-semibold py-2 rounded-lg transition 
                duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
            >
              Verify
            </button>
          </div>
        )}

        {step == 3 && (
          <div>
            {/* email */}
            <div className="mb-6">
              <label
                htmlFor="New Password"
                className="block text-gray-700 font-medium mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none  "
                placeholder="Enter New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>
            {/* confirm password */}
            <div className="mb-6">
              <label
                htmlFor="Confirm Password"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none  "
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>

            {/* send otp button */}
            <button
              onClick={handleResetPassword}
              className={`w-full font-semibold py-2 rounded-lg transition 
                duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
