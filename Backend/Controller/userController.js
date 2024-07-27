import userModel from "../Models/userModel.js";
import jwt from 'jsonwebtoken';

class userController{
    constructor(){

    }
    // Register user API
    async registerUser(req,res){
        const {name,email,password} = req.body;
        const userData = {name,email,password};

        const findUser = await userModel.findOne({email});
        if(findUser){
            return res.status(404).json({message : "User Already Registered, Please Login", success : false})
        }
        try{    
            const newUser = new userModel(userData);
            await newUser.save();
            return res.status(200).json({message : "User Successfully registered", success:true});
        }
        catch(err){
            return res.status(200).json({message : "Unexpected Error occured during creation", success : false});
        }
    }
    // User login validation
    async loginUser(req,res){
        const {email,password} = req.body;
        const findUser = await userModel.findOne({email});
        if(!findUser){
            return res.status(400).json({messsage : "Un-Registered User kindly Registered First", success : false})
        }
        try{
            const checkPassword = findUser.comparePassword(password);
            if(checkPassword){
                const token = jwt.sign({email : email},process.env.JWT_SECRET_KEY,{
                    expiresIn : '2h',
                })
                return res.status(200).json({message : "Log in Successfull", accessToken : token, success : true})
            }
            return res.status(400).json({message : "Wrong Password Please try again", success : false})
        }
        catch(err){
            return res.status(400).json({message : "Unexpected error encountered", success : false});
        }
    }
}
export default userController;