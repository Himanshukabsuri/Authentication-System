import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const signup = async(req,res)=>{
    try {
        const {fullName,email,password} = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({message:"Invalid credential"})
        }

        const existUser = await User.findOne({email})

        if (existUser) {
            return res.status(400).json({message:"User already exists."})
        }

        const hashPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            fullName,
            email,
            password:hashPassword
        })

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

        res.status(200).json({success:true,message:"Signup Successfully"})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;

         if ( !email || !password) {
            return res.status(400).json({message:"Invalid credential"})
        }

        const existUser = await User.findOne({email})

        if (!existUser) {
            return res.status(400).json({message:"User already exists."})
        }

        const isMatchPassword = await bcrypt.compare(password,existUser.password)

        if (!isMatchPassword) {
            return res.status(400).json({message:"Password is incorrect"})
        }

        const token = jwt.sign({id:existUser._id},process.env.JWT_SECRET,{expiresIn:"7d"})

        res.status(200).json({success:true,message:"Login succefully",token})


    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}


export const getProfile = async(req,res)=>{
    try {
        res.status(200).json({
      success: true,
      user: req.user,
    });
    } catch (error) {
        res.status(500).json({
      success: false,
      message: error.message,
    });
  
    }
}