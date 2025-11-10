import express from 'express';

import { isAuth } from './../middlewares/auth.middlewares.js';
import { addItem, editItem } from '../controllers/items.controllers.js';
import { uploadOnMulter } from '../middlewares/multer.js';



const itemRouter = express.Router();


itemRouter.post('/add-Item' ,isAuth , uploadOnMulter.single("image"), addItem);
//here we pass itemid in params
itemRouter.post('/edit-Item/:itemId' ,isAuth , uploadOnMulter.single("image"), editItem);
itemRouter.delete('/delete-Item/:itemId' ,isAuth ,  );


export default itemRouter;