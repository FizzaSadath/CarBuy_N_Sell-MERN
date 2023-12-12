import express from "express";
import dotenv from "dotenv";
import connect from "./database/connect.js";
import cookieParser from "cookie-parser";
import userRouter from "./api/userRouter.js";
import vehicleRouter from "./api/vehicleRouter.js"

const app = express();

dotenv.config();

connect();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/user", userRouter);
app.use("vehicle",vehicleRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
