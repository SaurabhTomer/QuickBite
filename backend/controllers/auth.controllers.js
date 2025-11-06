import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { genToken } from "../utils/token.js";
import { sendotpMail } from "../utils/mail.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, mobile, role, password } = req.body;

    // validate required fields
    if (!fullName || !email || !mobile || !role || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // check password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // check mobile length
    if (mobile.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Mobile number must be exactly 10 digits",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    user = await User.create({
      fullName,
      email,
      mobile,
      role,
      password: hashedPassword,
    });

    // generate token
    const token = await genToken(user._id);

    // set cookie
    res.cookie("token", token, {
      secure: false, // use true in production with HTTPS
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "Signup failed, please try again later",
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Compare password
    const isMatched = bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token
    const token = await genToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      secure: false, // use true in production (with HTTPS)
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.error("SignIn Error:", error);
    return res.status(500).json({
      success: false,
      message: "SignIn failed, please try again later",
    });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    console.error("Signout Error:", error);
    return res.status(500).json({
      success: false,
      message: "Signout failed, please try again later",
    });
  }
};

export const sendOtp = async (req,res) => {
  try {
    //fetch email from body
    const {email} = req.body;
    //vaidate email
    if( !email){
      return res.status(400).json({message:"send email"})
    }
    //check user exist or not
    const user = await user.findOne({email})
    if(!user){
        return res.status(400).json({message:"User does not exists"})
    }
    //generate otp
    const otp = Math.floor(1000 * Math.random() * 9000).toString();
    //save generated otp in user  details 
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpverified = false;
    //save user
    await user.save();

    //send mail
    await sendotpMail(user.email , otp);

     return res.status(200).json({message:"otp send successfully"})
    

  } catch (error) {
    // console.log("otp send error");
     return res.status(500).json(`send otp error ${error}`)
    
  }
}