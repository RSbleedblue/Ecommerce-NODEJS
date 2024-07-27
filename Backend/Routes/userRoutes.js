import { Router } from 'express';
import userController from '../Controller/userController.js';
const userRouter = Router();
const UserController = new userController;

userRouter.post("/register", (req,res) => UserController.registerUser(req,res));
userRouter.post("/login", (req,res) => UserController.loginUser(req,res));
export default userRouter;
