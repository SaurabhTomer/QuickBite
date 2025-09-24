import express from 'express'
import { signIn, signOut, signUp ,verifyOtp , resetPassword , sendOtp, googleAuth} from '../controllers/auth.controllers.js';

const authRouter = express.Router();

authRouter.post('/signup' , signUp)
authRouter.post('/signin' , signIn)
authRouter.get('/signout' , signOut)
authRouter.post('/send-otp' , sendOtp)
authRouter.post('/verify-otp' , verifyOtp)
authRouter.post('/reset-password' , resetPassword)
authRouter.post('/google-auth' , googleAuth)

export default authRouter;