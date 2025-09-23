import User from "../models/user.models.js";
import bcryptjs from 'bcryptjs'
import { genToken } from "../utils/token.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exists." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters. " });
    }

    if (mobile.length < 10 && mobile.length > 10) {
      return res
        .status(400)
        .json({ message: "Mobile must be atleast 10 digits. " });
    }

    const hashedPassword = await bcryptjs.hash(password , 10);

    user = await User.create({
        fullName,
        email,
        mobile,
        password : hashedPassword,
        role
    })
     
    const token = await genToken(user._id)
    res.cookie("token" , token , {
        secure : false,
        sameSite : "strict",
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    })

    return res.status(201).json(user)
  } catch (error) {
    return res.status(500).json(`SignUp error ${error} `)
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if ( !user) {
      return res.status(400).json({ message: "user does not exists." });
    }

   
    const isMatch = await bcryptjs.compare(password , user.password);

    if( !isMatch){
        return res.status(400).json({message:"Incorrect Password"})
    }
     
    const token = await genToken(user._id)
    res.cookie("token" , token , {
        secure : false,
        sameSite : "strict",
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    })

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json(`SignIn error ${error} `)
  }
};


export const signOut = async (req,res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"Log out succesfully"})
    } catch (error) {
        
        return res.status(500).json({message:`sign out error ${error}`})
    }
}