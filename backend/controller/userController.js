import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import {generateTokenAndSetCookie} from '../lib/utils/generateToken.js';

export const signup = async(req,res) =>{
   try{
        const {fullName, email, password} = req.body;

        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({error:"Email is already in use"});
        }

        if(password.length<8){
            return res.status(400).json({error:"Password must be of 8 characters"});
        }
        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            })
        }
        else{
            res.status(400).json({error:"Invalid user data"});
        }
   }catch(error){
        
        res.status(500).json({error:"Internal Server Error"});

   }
};

export const login = async(req,res) =>{
 try{
    const{email, password}=req.body;
    const user = await User.findOne({email});
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

    if(!user || !isPasswordCorrect){
        return res.status(400).json({error:"Invalid Username or Password"})
    }

    generateTokenAndSetCookie(user._id,res);

    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
     });
 }
 catch(error){
    console.log("Error in login controller",error.message);
    res.status(500).json({error:"Internal Server Error"});
 }
};

export const logout = async(req,res) =>{
   try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged Out Successfully"})
   }
   catch(error){
        console.log("Error in logout Controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
   }
};
