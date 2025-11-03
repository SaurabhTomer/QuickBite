import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { genToken } from "../utils/token.js";

export const signUp = async (req, res) => {
  try {
    //get data from req
    const { fullName, email, mobile, role, password } = req.body;

    //check if user is already exists
    const user = await User.find({ email });

    if (email) {
      return res
        .status(400)
        .json({  message: "user already exists" });
    }
    //check password length
    if (password < 6) {
      return res
        .status(400)
        .json({
          success: false,
          message: "password must be of atleast 6 characters",
        });
    }

    //check mobile length
    if (mobile.length < 10) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Mobile number must be of 10 Numbers",
        });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    user = await User.create({
      fullName,
      email,
      mobile,
      role,
      password: hashedPassword,
    });

    //get token for a particular user
    const token = await genToken(user._id);

    //set cookie with token name and value
    res.cookie("token", token, {
      secure: false,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expire im 7 day
    });

    return res.status(201).json(user)

  } catch (error) {
    return res.status(500).json({ success: false, message: "signup error" });
  }
};

export const signIn = async (req, res) => {
  try {
    //get data from req
    const {  email, password } = req.body;

    //check if user is already exists
    const user = await User.find({ email });

    if ( !email) {
      return res
        .status(400)
        .json({  message: "user does not  exists" });
    }
   
    //comapre password from database
   const isMatched = await bcrypt.compare(password , user.password);

   if(!isMatched){
    return res
        .status(400)
        .json({  message: "Password does not matched" });
   }

    //get (generate) token for a particular user
    const token = await genToken(user._id);

    //set cookie with token name and value
    res.cookie("token", token, {
      secure: false,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expire im 7 day
    });

   return res.status(200).json(user)

  } catch (error) {
    return res.status(500).json({ success: false, message: "signIn error" });
  }
};


export const signOut = async (req,res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"logout successfully"})
    } catch (error) {
           return res.status(500).json(`Sign out error ${error}`)
    }
}