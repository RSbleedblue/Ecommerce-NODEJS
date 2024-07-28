import { urlencoded } from "express";
import mongoose from "mongoose";

const connectDB = mongoose.connect(process.env.MONGO_URL,{
    appName : "E-Commerce"    
})
console.log("Database Connected");

export default connectDB;