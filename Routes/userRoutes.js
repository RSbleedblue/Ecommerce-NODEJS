import { Router } from 'express';
import userController from '../Controller/userController.js';
const userRouter = Router();
const UserController = new userController();

userRouter.post("/register", (req, res) => UserController.registerUser(req, res));
userRouter.post("/login", (req, res) => UserController.loginUser(req, res));
userRouter.post("/updateAddress/:id", (req, res) => UserController.addressMng(req, res));
userRouter.post("/Addwishlist/:id", (req, res) => UserController.addToWishlist(req, res));
userRouter.post("/Removewishlist/:id", (req, res) => UserController.removeFromWishlist(req, res));
userRouter.post("/AddToCart/:id", (req, res) => UserController.addToCart(req, res));
userRouter.post("/RemoveFromCart/:id", (req, res) => UserController.removeFromCart(req, res));
userRouter.get("/ViewCart/:id", (req, res) => UserController.viewCart(req, res));

export default userRouter;
