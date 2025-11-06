import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-[#fff9f6]">
      {/* forgot password heading */}
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4">
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
          </div>
        )}

        {/*  send otp button */}
        <button
          className={'w-full font-semibold pointer-cursor text-center bg-[#ff4d2d] text-white hover:bg-[#e64323] py-2 rounded-lg '}
        >
          Send OTP
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
