import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";

const app = express();
const port = process.env.PORT || 5000 ;



app.listen(port , () => {
    connectDB();
    console.log(`server started at ${port}`); 
})

