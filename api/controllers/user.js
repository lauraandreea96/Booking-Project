import User from "../models/User.js"
import bcrypt from "bcryptjs";

//update user
export const updateUser = async (req, res, next)=>{

    try{
        
        if("password" in req.body){
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hash
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: {...req.body}}, {new: true});
        res.status(200).json(updatedUser);
    }catch(err){
        next(err);
    }
};

//delete user
export const deleteUser = async (req, res, next)=>{

    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    }catch(err){
        next(err);
    }
};

//get user by id
export const getUser = async (req, res, next)=>{
    
    try{
        const user = await User.findById(req.params.id);
         res.status(200).json(user);
     }catch(err){
         next(err);
     }
};

//get all users
export const getUsers = async (req, res, next)=>{
    
    try{
        const users = await User.find();
         res.status(200).json(users);
     }catch(err){
         next(err);
     }
};

export const countUsers = async (req, res, next)=>{
    try{
        const list = await User.countDocuments();
         res.status(200).json(list);
     }catch(err){
         next(err);
     }
}; 