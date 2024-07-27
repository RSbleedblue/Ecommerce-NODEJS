import mongoose from "mongoose";

const productShcema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    rating: {
        type: Number,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: String,
        required: true,
        default: 0,
    },
    images: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    }
})

productShcema.pre("save", function (next) {
    this.updatedAt = Date.now(),
        next();
})

export default mongoose.model("product",productShcema, "Products");