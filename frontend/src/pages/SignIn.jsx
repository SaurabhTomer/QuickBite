import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

function SignIn() {

    //color properties 
  const bgColor = "#fff9f6";
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false); //  state for toggling visibility


  //naviagte to move to next pages
  const navigate = useNavigate();

  //states for  user entered field

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



//   function to handle submit signin data
  const handleSignIn = async () => {
    try {
        const result = await axios.post(`${serverUrl}/api/auth/signin`,
        {
            email , password
        },
        {withCredentials:true}
    )
    console.log(result);
    
    } catch (error) {
        console.log(error);   
    }
  }

  //function to handle google auth thorough firebase
    const handleGoogleAuth = async () => {
  
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // console.log(result);
      try {
        const data = await axios.post(`${serverUrl}/api/auth/google-auth`,
          {
            email:result.user.email,
           
          } , {withCredentials:true})
          console.log(data);
          
      } catch (error) {
        console.log(error);
        
      }
    };

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
          Sign In to your account to get Started with delicious food deliveries
        </p>


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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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

        {/* forgot password */}
        <div className="text-right mb-4 text-[#ff4d2d] cursor-pointer" 
        onClick={() => navigate('/forgot-password')}>
            Forgot Password
        </div>

        

        {/* signup button */}
        <button
          className={`w-full font-semibold pointer-cursor text-center bg-[#ff4d2d] text-white hover:bg-[#e64323] py-2 rounded-lg  `}
          onClick={handleSignIn}
        >
          Sign In
        </button>

        {/* signup  with google */}
        <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 hover:bg-gray-100 border-gray-400"
        onClick={handleGoogleAuth}>
          <FcGoogle size={20} />
          <span>Sign In with Google</span>
        </button>

        {/* line below that google signup */}
        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Want to create new account ?{" "}
          <span className="text-[#ff4d2d]">Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
