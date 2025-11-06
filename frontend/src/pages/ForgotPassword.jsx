import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate();

  const [step, setStep] = useState(1); //state for steps
  //states for user entered fields
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-[#fff9f6]">
      {/* forgot password heading */}
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4 cursor-pointer">
          <IoIosArrowRoundBack
            className="text-[#ff4d2d] "
            size={30}
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>

        {/* perform 3 pages using step idea  */}
        {step == 1 && (
          <div>
            {/* email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700  font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full  border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            {/*  send otp button */}
            <button
              className={
                "w-full font-semibold pointer-cursor text-center bg-[#ff4d2d] text-white hover:bg-[#e64323] py-2 rounded-lg "
              }
            >
              Send OTP
            </button>
          </div>
        )}

        {/* step 2 */}
        {step == 2 && (
          <div>
            {/* enter otp */}
            <div className="mb-6">
              <label
                htmlFor="OTP"
                className="block text-gray-700  font-medium mb-1"
              >
                OTP
              </label>
              <input
                type="text"
                className="w-full  border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter OTP "
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>
            {/*  verify button */}
            <button
              className={
                "w-full font-semibold pointer-cursor text-center bg-[#ff4d2d] text-white hover:bg-[#e64323] py-2 rounded-lg "
              }
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* step 3 */}
        {step == 3 && (
          <div>
            {/* new password */}
            <div className="mb-6">
              <label
                htmlFor="newPassword"
                className="block text-gray-700  font-medium mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                className="w-full  border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder=" New Password "
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>

            {/* confirm password */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700  font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full  border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                placeholder=" Confirm Password "
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            {/*  password button */}
            <button
              className={
                "w-full font-semibold pointer-cursor text-center bg-[#ff4d2d] text-white hover:bg-[#e64323] py-2 rounded-lg "
              }
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
