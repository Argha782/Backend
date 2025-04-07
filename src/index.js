// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";

dotenv.config({
    path: './env'
})

connectDB()
.then((result) => {
  const port= process.env.PORT || 8000
  app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
  })
  app.listen("error", (error)=>{
    console.log("ERROR: ", error);
    throw error
  })
}).catch((err) => {
  console.log("MONGO_DB connection FAILED!!!",err);
});





/*
import express from "express";
const app = express();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    application.on("error", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERROR: ", error);
    throw error;
  }
});
 */