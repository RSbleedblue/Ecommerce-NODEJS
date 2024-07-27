import mongoose, { Mongoose } from "mongoose";

const commentSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    comment : {
        type : String,
        required : true,
    }
})

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    blog : {
        type : String,
        requried : true,
    },
    like : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }],
    comments : [commentSchema],
    createdAt : {
        type : Date,
        default : Date.now,
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        requried : true,
    }
})

const Blog = mongoose.model("blog",blogSchema, "Blogs");

export {Blog};