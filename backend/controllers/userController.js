import userModel from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from "validator"


//login user

const loginUser = async (req,res) => {
    const {email,password}= req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not Found"})
        }
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true,token});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error in logging in"})
        
    }

}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser = async (req,res) => {
   const {name,email,password}= req.body;

   //checking is user already exists 
   try {
    const exists = await userModel.findOne({email});
    if(exists){
        return res.json({success:false,message:"User already exists"})
    }
    //validating email and password
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"please enter a valid email"})
    }
    if(password.length<8){
        return res.json({success:false,message:"password must be at least 8 characters"})
    }
    //hashing password
    const salt = await bcrypt.genSalt(10)
    const hasedPassword = await bcrypt.hash(password,salt);

    const newUser = new userModel({
        name:name,
        email:email,
        password:hasedPassword
    })    

    const user = await newUser.save()
    const token = createToken(user._id)
    res.json({success:true,token});
   } catch (error) {
    console.log(error);
    res.json({success:false,message:"error in registering user"})
    
   }
}

export {loginUser,registerUser}