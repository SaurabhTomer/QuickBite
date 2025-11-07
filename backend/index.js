import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import  cors from 'cors';
import userRouter from "./routes/user.routes.js";

const app = express();
const port = process.env.PORT || 5000;

//global middlware to parse data in json format
app.use(express.json());
//to parse cookie
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  connectDB(); //database connected
  console.log(`server started at ${port}`);
});
