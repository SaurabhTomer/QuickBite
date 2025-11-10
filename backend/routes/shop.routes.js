import express from 'express';

import { isAuth } from './../middlewares/auth.middlewares.js';
import { createShop, deleteShop, editShop, getMyShop } from '../controllers/shop.controllers.js';
import { uploadOnMulter } from '../middlewares/multer.js';


const shopRouter = express.Router();


shopRouter.post('/createShop' ,isAuth , uploadOnMulter.single("image") ,createShop);
shopRouter.patch('/editShop' ,isAuth , uploadOnMulter.single("image"), editShop);
shopRouter.get('/getmyshop' ,isAuth ,  getMyShop);
shopRouter.delete('/deleteShop' ,isAuth ,  deleteShop);


export default shopRouter;