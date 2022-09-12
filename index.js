import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";

const app = express();
const port = 3001;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

const connectionToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection to mongoDB is successfull!");
  } catch (error) {
    console.error(error);
  }
};
//user
app.use("/api", userRoute); 

//auth
app.use("/api", authRoute); 

app.listen(port, () => {
  connectionToDB();
  console.log(`server started ${port}`);
});