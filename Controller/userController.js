import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import userModel from '../Models/userModel.js';

class userController {
    constructor() {}

    async registerUser(req, res) {
        const { name, email, password } = req.body;
        const userData = { name, email, password };

        const findUser = await userModel.findOne({ email });
        if (findUser) {
            return res.status(400).json({ message: "User Already Registered, Please Login", success: false });
        }
        try {
            const salt = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(password, salt);

            const newUser = new userModel(userData);
            await newUser.save();
            return res.status(201).json({ message: "User Successfully Registered", success: true });
        } catch (err) {
            return res.status(500).json({ message: "Unexpected Error Occurred During Creation", success: false, error: err.message });
        }
    }

    async loginUser(req, res) {
        const { email, password } = req.body;
        const findUser = await userModel.findOne({ email });
        if (!findUser) {
            return res.status(400).json({ message: "Unregistered User, Kindly Register First", success: false });
        }
        try {
            const isMatch = await bcrypt.compare(password, findUser.password);
            if (isMatch) {
                const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, {
                    expiresIn: '2h',
                });
                return res.status(200).json({ message: "Login Successful", accessToken: token, success: true });
            }
            return res.status(400).json({ message: "Wrong Password, Please Try Again", success: false });
        } catch (err) {
            return res.status(500).json({ message: "Unexpected Error Encountered", success: false, error: err.message });
        }
    }

    async addressMng(req, res) {
        const { address } = req.body;
        const userID = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userID)) {
            return res.status(400).json({ message: "Invalid User ID", success: false });
        }

        try {
            const checkUser = await userModel.findById(userID);
            if (!checkUser) {
                return res.status(404).json({ message: "Failed to Find the User", success: false });
            }

            checkUser.address = address;
            await checkUser.save();

            return res.status(200).json({ message: "Address Added Successfully", success: true, data: checkUser });
        } catch (err) {
            return res.status(500).json({ message: "Unexpected Error Occurred", success: false, error: err.message });
        }
    }

    async addToWishlist(req, res) {
        const userID = req.params.id;
        const { productID } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(productID)) {
            return res.status(400).json({ message: "Invalid User ID or Product ID", success: false });
        }

        try {
            const checkUser = await userModel.findById(userID);
            if (!checkUser) {
                return res.status(404).json({ message: "User doesn't Exist", success: false });
            }

            if (checkUser.wishlist.includes(productID)) {
                return res.status(400).json({ message: "Product Already in Wishlist", success: false });
            }

            checkUser.wishlist.push(productID);
            await checkUser.save();

            return res.status(200).json({ message: "Successfully Added to the Wishlist", success: true, data: checkUser.wishlist });
        } catch (err) {
            return res.status(500).json({ message: "Error Adding Product to the Wishlist", success: false, error: err.message });
        }
    }

    async removeFromWishlist(req, res) {
        const userID = req.params.id;
        const { productID } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(productID)) {
            return res.status(400).json({ message: "Invalid User ID or Product ID", success: false });
        }

        try {
            const checkUser = await userModel.findById(userID);
            if (!checkUser) {
                return res.status(404).json({ message: "User doesn't Exist", success: false });
            }

            const productIndex = checkUser.wishlist.indexOf(productID);
            if (productIndex === -1) {
                return res.status(400).json({ message: "Product Not in Wishlist", success: false });
            }

            checkUser.wishlist.splice(productIndex, 1);
            await checkUser.save();

            return res.status(200).json({ message: "Successfully Removed from the Wishlist", success: true, data: checkUser.wishlist });
        } catch (err) {
            return res.status(500).json({ message: "Error Removing Product from the Wishlist", success: false, error: err.message });
        }
    }

    async addToCart(req, res) {
        const userID = req.params.id;
        const { productID, quantity } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(productID)) {
            return res.status(400).json({ message: "Invalid User ID or Product ID", success: false });
        }

        try {
            const checkUser = await userModel.findById(userID);
            if (!checkUser) {
                return res.status(404).json({ message: "User doesn't Exist", success: false });
            }

            const cartItem = checkUser.cart.find(item => item.productID.toString() === productID);
            if (cartItem) {
                cartItem.quantity += quantity;
            } else {
                checkUser.cart.push({ productID, quantity });
            }

            await checkUser.save();

            return res.status(200).json({ message: "Successfully Added to the Cart", success: true, data: checkUser.cart });
        } catch (err) {
            return res.status(500).json({ message: "Error Adding Product to the Cart", success: false, error: err.message });
        }
    }

    async removeFromCart(req, res) {
        const userID = req.params.id;
        const { productID } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(productID)) {
            return res.status(400).json({ message: "Invalid User ID or Product ID", success: false });
        }

        try {
            const checkUser = await userModel.findById(userID);
            if (!checkUser) {
                return res.status(404).json({ message: "User doesn't Exist", success: false });
            }

            const cartItemIndex = checkUser.cart.findIndex(item => item.productID.toString() === productID);
            if (cartItemIndex === -1) {
                return res.status(400).json({ message: "Product Not in Cart", success: false });
            }

            checkUser.cart.splice(cartItemIndex, 1);
            await checkUser.save();

            return res.status(200).json({ message: "Successfully Removed from the Cart", success: true, data: checkUser.cart });
        } catch (err) {
            return res.status(500).json({ message: "Error Removing Product from the Cart", success: false, error: err.message });
        }
    }

    async viewCart(req, res) {
        const userID = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userID)) {
            return res.status(400).json({ message: "Invalid User ID", success: false });
        }

        try {
            const checkUser = await userModel.findById(userID).populate('cart.productID');
            if (!checkUser) {
                return res.status(404).json({ message: "User doesn't Exist", success: false });
            }

            return res.status(200).json({ message: "Cart Retrieved Successfully", success: true, data: checkUser.cart });
        } catch (err) {
            return res.status(500).json({ message: "Error Retrieving Cart", success: false, error: err.message });
        }
    }
}

export default userController;
