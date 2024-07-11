import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Todo from "../models/todo.js";
import {JWT_SECRET} from '../config.js';
import Category from "../models/Category.js";

export const getAllUser = async (request, response) => {
    try {
      const users = await User.find({});
      if (users.length === 0) {
        return response.status(404).json({ message: "No user" });
      }
      return response.status(200).json({
        count: users.length,
        data: users,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  };
export const register = async (request, response)=> {
    const {name, email, password, age} = request.body;

    try {
        let user = await User.findOne({email});
        if(user) {
            return response.status(400).json({message:"User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email, 
            password :hashPass,
            age,
        })
        await user.save();

        const payload = {
            user: user._id,
        }
        const token = jwt.sign(payload, JWT_SECRET,{expiresIn:360000});

        response.cookie("token", token, {httpOnly: true, expiresIn:360000});
        // create category sample
        await Category.create({
            categoryName: "Others",
            description: "Category sample!",
            user: user._id,
        })
        const categorySample = await Category.findOne({categoryName: "Others"})
        const {password: pass, ...rest} = user._doc;
        response.status(201).json({message:"user created successfully", user: rest, categorySample: categorySample});
    } catch (error) {
        console.log(error.message);
        response.status(500).json({message:error.message});
    }
};
export const login = async(request, response)=> {
    const {email, password} = request.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return response.status(404).json({message:"Invalid email"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return response.status(400).json({message:"invalid password"});
        }
        await user.save();

        const payload = {
            user: user._id,
        }
        const token = jwt.sign(payload, JWT_SECRET,{expiresIn:360000});

        response.cookie("token", token, {httpOnly: true, expiresIn:360000});

        const {password: pass, ...rest} = user._doc;
        response.status(200).json({message:"user Logged In successfully",token, user: rest});
    } catch (error) {
        console.log(error);
        response.status(500).json({message:error.message});
    }
};
export const logout = async(request, response)=> {
    response.clearCookie("token");
    response.status(200).json({message:"User Logged out successfully"})
};

export const getMe = async(request, response)=> {
    try {
        const user = await User.findById(request.user);
        if(!user){
            return response.status(404).json({message:"User not found"});
        }
        const {password: password, ...rest} = user._doc;
        return response.status(200).json({
            msg: "User Found",
            user: rest,
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({message:error.message});
    }
};
export const updateDetail = async(request, response)=> {
    const {name, email, age} = request.body;

    try {
        const user = await User.findById(request.user);
        if(!user){
            return response.status(404).json({message:"User not found"});
        }
        const userExists = await User.findOne({email});
        if(userExists && userExists._id.toString() !== user._id.toString()){
            return response.status(404).json({message:"email aready Exists"});
        }
        user.name = name;
        user.email = email;
        user.age = age;

        await user.save();
        const {password: pass, ...rest} = user._doc;
        return response.status(200).json({
            msg: "User updated successfully",
            user : rest,
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({message:error.message});
    }
};
export const updatePassword = async(request, response)=> {
    const {password, newPassword} = request.body;
    try {
        const user = await User.findById(request.user);
        if(!user){
            return response.status(404).json({message:"User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return response.status(400).json({message: "invalid credentials"});
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        const {password:pass, ...rest} = user._doc;
        await user.save();
        return response.status(200).json({msg: "password is updated successfully", user: rest});
    } catch (error) {
        console.log(error);
        response.status(500).send({message:error.message});
    }
};
export const deleteUser = async(request, response)=> {
    try {
        const user = await User.findById(request.user);
        console.log("user is: ",user)
        if(!user){
            return response.status(404).json({message:"User not found"});
        }
        // delete relevant to do list
        const todos = await Todo.find({user: request.user});
        if(todos){
           await Todo.deleteMany({user : request.user})
        }
        // delete categories relevant
        const categories = await Category.find({user: request.user});
        console.log("ádsdcategdor:",categories);
        if(categories){
           await Category.deleteMany({user : request.user})
        }
        response.clearCookie("token");
        await user.deleteOne({_id: request._id});
        return response.status(200).json({message: "User is deleted successfully"});
    } catch (error) {
        console.log(error);
        response.status(500).json({message:error.message});
    }
};