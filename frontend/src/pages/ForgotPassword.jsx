import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from 'react-spinners'

function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); //state for steps
  //states for user entered fields
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  //state to show error
  const [error, setError] = useState("");

    //to show loading icon
    const [loading , setLoading] = useState(false);

  //handle send otp functionality
  const handleSendOtp = async () => {
       setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      // console.log(result);
      // necessary to move to move to next page
      setStep(2);
         setLoading(false);

      setError("");
    } catch (error) {
         setLoading(false);
      // console.log(error);
      return setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "something went wrong"
      );
    }
  };

  //handle verify otp
  const handleVerifyOtp = async () => {
       setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      // console.log(result);
      // necessary to move to move to next page
      setStep(3);
         setLoading(false);

      setError("");
    } catch (error) {
       setLoading(false);
      // console.log(error);
      return setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "something went wrong"
      );
    }
  };

  //handle reset password
  const handleReset = async () => {
    if (newPassword != confirmPassword) {
      return setError(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "something went wrong"
      );

     
    } 
     setLoading(true); 
      try {
        const result = await axios.post(
          `${serverUrl}/api/auth/reset-password`,
          { email, newPassword },
          { withCredentials: true }
        );
        // console.log(result.data);
        setError("");
         setLoading(false);
        // necessary to move to move to next page
        navigate("/signin");
      } catch (error) {
         setLoading(false);
        // console.log(error);
        return setError(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "something went wrong"
        );
      }
    
  };

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
                required
              />
            </div>
            {/*  send otp button */}
            <button
              className={
                "w-full font-semibold pointer-cursor text-center bg-[#ff4d2d] text-white hover:bg-[#e64323] py-2 rounded-lg "
              }
              onClick={handleSendOtp}
               //work when loadind is true disbale the button
          disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Send OTP"}
            </button>
            {/* Show error message if any */}
            <p className="text-red-500 text-center my-2.5"> {error} </p>
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
                required
              />
            </div>
            {/*  verify button */}
            <button
              className={
                "w-full font-semibold pointer-cursor text-center bg-[#ff4d2d] text-white hover:bg-[#e64323] py-2 rounded-lg "
              }
              onClick={handleVerifyOtp}
               //work when loadind is true disbale the button
          disabled={loading}
            >
               {loading ? <ClipLoader size={20} color="white" /> : "Verify OTP"}
            </button>
            {/* Show error message if any */}
            <p className="text-red-500 text-center my-2.5"> {error} </p>
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
                "w-full font-semibold cursor-pointer text-center bg-[#ff4d2d] text-white hover:bg-[#e64323] py-2 rounded-lg "
              }
              onClick={handleReset}
               //work when loadind is true disbale the button
          disabled={loading}
            >
                 {loading ? <ClipLoader size={20} color="white" /> : "Reset Password"}
            </button>

            {/* Show error message if any */}
            <p className="text-red-500 text-center my-2.5"> {error} </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
