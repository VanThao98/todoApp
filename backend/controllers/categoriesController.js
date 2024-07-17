import Category from "../models/Category.js";
import Todo from "../models/Todo.js";
import { UpperFirstLetter } from "../utils/UpperFirstLetter.js";

export const getAllCategory = async (request, response) => {
  try {
    const categories = await Category.find({ user: request.user });
    if (categories.length === 0) {
      return response.status(404).json({ message: "No category list created yet" });
    }
    return response.status(200).json({
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
};
export const getOneCategory = async (request, response) => {
    const {id} = request.params;
  try {
    const category = await Category.findById(id);
    if(!category){
        return response.status(404).json({message: "category not found"});
    }
    if(category.user.toString() !== request.user){
        return response.status(401).json({message: "not authorized", id_user_category: category.user.toString(), id_user_logged: request.user })
    }
    return response.status(200).json({message: "success", category})
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
};
export const createCategory = async (request, response) => {
    let {categoryName, description} = request.body;
    try {
        const categoryCurrent = await Category.find({ user: request.user, categoryName : categoryName});
            if(categoryCurrent.length > 0){
                return response.status(400).json({message:"category already exists"});
            }
        categoryName = UpperFirstLetter(categoryName)
        const category = await Category.create({
            categoryName,
            description,
            user: request.user,
        })
        return response.status(201).json({message: "category create successfully", category});
    } catch (error) {
        console.log(error.message);
        response.status(500).json({message: error.message});
    }
};
export const updateCategory = async (request, response) => {
    const {id} = request.params;
    const {categoryName, description} = request.body;
    try {
        const category = await Category.findById(id);
        if(!category){
            return response.status(404).json({message: "category not found"});
        }
        // check authorize
        if(category.user.toString() !== request.user){
            return response.status(401).json({message:"not authorized", id_user_category: category.user.toString(), id_user_logged: request.user});
        }
        //check sample
        if(category.categoryName === "Others"){
            return response.status(400).json({message:"can not update sample data"})
        }
        // check exists
        const categories = await Category.findOne({ user: request.user, categoryName: request.categoryName});
        if(categories){
            return response.status(400).json({message:"category already exists"});
        }
        // save
        category.categoryName = categoryName;
        category.description = description;
        await category.save();

        return response.status(200).json({message :"category updated successfully", category})
    } catch (error) {
        console.log(error.message);
        response.status(500).json({message: error.message});
    }
};
export const deleteOneCategory = async (request, response) => {
    const {id} = request.params;
    try {
        const category = await Category.findById(id);
        if(!category){
            return response.status(404).json({message:"category not found"});
        }
        if(category.user.toString() !== request.user){
            return response.status(401).json({message: "not authorized", id_user_category: category.user.toString(), id_user_logged: request.user});
        }
        // check sample
        if(category.categoryName === "Others"){
            return response.status(400).json({message:"can not delete sample data"})
        }
        // check to do relevant
        const todos = await Todo.find({user: request.user, category: category.categoryName});
        if(todos){
           await Todo.deleteMany({user : request.user, category: category.categoryName})
        }
        await category.deleteOne({_id : request._id})
        return response.status(200).json({message:"category deleted successfully"});
    } catch (error) {
        console.log(error.message);
        response.status(500).json({message: error.message});
    }
};
export const deleteAllCategory = async (request, response) => {
    try {
        const categories = await Category.find({user: request.user});
        if(categories.length === 0){
            return response.status(404).json({message:"have not category"});
        }
        if(categories[0].user.toString() !== request.user){
            return response.status(401).json({message: "not authorized"});
        }
        // check todo relevant
        const todos = await Todo.find({user: request.user, category: { $ne: "Others" }});
        if(todos){
           await Todo.deleteMany({user : request.user, category: { $ne: "Others" }})
        }
        await Category.deleteMany({user: request.user, categoryName: { $ne: "Others" }})
        return response.status(200).json({message:"category deleted successfully"});
    } catch (error) {
        console.log(error.message);
        response.status(500).json({message: error.message});
    }
};
