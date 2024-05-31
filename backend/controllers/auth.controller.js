import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import {errorHandler} from '../utils/error.js'
import jwt from 'jsonwebtoken'


const JWT_SECRET="noor12334jahan"
export const signup =async(req, res,next)=>{
    console.log(req.body);
     const {username,email,password}=req.body;
    try {
        const hashedPassword=bcryptjs.hashSync(password,12);
        const newUser =new User({username, email, password:hashedPassword});
        await newUser.save();
   
        const {password:hashed,...user}=newUser._doc;

        //for removing the password without spreading it is not optimized as taking another call to the database
       //  const user =await User.find({_id:newUser._id}).select("-password")

       res.status(200).json(user)
    } catch (error) {
        next(error)        
    }

}
export const signin =async(req, res, next)=>{
    const {email,password}=req.body;
    console.log(email,password)

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found!'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));  
        const token = jwt.sign({ id: validUser._id }, JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
    
    
    } catch (error) {
        next(error)
    }

}

    
    
    
    export const signOut = async (req, res, next) => {
        try {
          res.clearCookie('access_token');
          res.status(200).json('User has been logged out!');
        } catch (error) {
          next(error);
        }
      }