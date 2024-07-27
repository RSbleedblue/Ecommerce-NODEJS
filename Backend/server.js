import app from "./index.js";
import connectDB from "./Utils/connectDB.js";
connectDB;
app.listen(4989, ()=>{
    console.log("Server is up and running on 4989");
})