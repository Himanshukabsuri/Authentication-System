import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'


export const protect = async(req,res,next)=>{
    try {

        // get token
        const token = req.headers.authorization;

        // check token

        if (!token) {
            return res.status(401).json({success:false,message:"No token provided"})
        }

        // token verify
        const decoded = jwt.verify(token,process.env.JWT_SECRET);


        // find user

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // attach user to request
    req.user = user;

    next()

    } catch (error) {
         res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
    }
}