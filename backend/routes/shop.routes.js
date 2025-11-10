import express from 'express';

import { isAuth } from './../middlewares/auth.middlewares.js';
import { createShop, deleteShop, editShop } from '../controllers/shop.controllers.js';


const shopRouter = express.Router();


shopRouter.post('/createShop' ,isAuth ,  createShop);
shopRouter.patch('/editShop' ,isAuth ,  editShop);
shopRouter.delete('/deleteShop' ,isAuth ,  deleteShop);


export default shopRouter;