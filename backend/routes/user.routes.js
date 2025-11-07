import express from 'express';
import { getCurrentUser } from '../controllers/user.controllers.js';
import { isAuth } from './../middlewares/auth.middlewares.js';


const userRouter = express.Router();


userRouter.get('/CurrentUser' ,isAuth ,  getCurrentUser);


export default userRouter;