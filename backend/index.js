import dotenv from "dotenv";
import { app } from "./app.js";
import mongoose from "mongoose";

dotenv.config({ path: ".env" });
const PORT = process.env.PORT;


const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(
      `MongoDB connected! DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection failed : ", error);
    throw error;
  }
};

connectDB()
  .then(() => {
    app.listen(PORT || 8000, (err) => {
      if(!err){
      console.log(`Server is running on PORT : ${PORT}`);
      }
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!", err);
  });