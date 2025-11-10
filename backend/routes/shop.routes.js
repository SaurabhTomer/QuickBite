import express from 'express';

import { isAuth } from './../middlewares/auth.middlewares.js';
import { createShop, editShop } from '../controllers/shop.controllers.js';


const shopRouter = express.Router();


shopRouter.post('/createShop' ,isAuth ,  createShop);
shopRouter.patch('/editShop' ,isAuth ,  editShop);


export default shopRouter;