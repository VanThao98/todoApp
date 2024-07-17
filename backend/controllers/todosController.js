import dayjs from "dayjs";
import Todo from "../models/todo.js";
import User from "../models/User.js";
import { SendEmailDeadline } from "../services/EmailService.js";

export const checkAndSendDeadlineEmail = async () => {
    try {
        // Lấy tất cả các todos có deadline gần nhất
        const todos = await Todo.find({
            deadline: { $gte: dayjs().format('MM-DD-YYYY HH:mm') } // Lấy những todo có deadline lớn hơn hoặc bằng thời điểm hiện tại
        });

        // Duyệt qua từng todo để kiểm tra và gửi email
        todos.forEach(async (todo) => {
            // Tính toán khoảng cách thời gian giữa hiện tại và deadline của todo
            const timeDiff = dayjs(todo.deadline, 'MM-DD-YYYY HH:mm').diff(dayjs(), 'hour'); // Ví dụ: tính theo giờ
            console.log('thời gian hiện tại:', timeDiff);
            // Nếu thời gian còn lại là ít hơn 24 giờ, bạn có thể gửi email thông báo
            if (timeDiff <= 24 && timeDiff >= 0) {
                // Gọi service để gửi email
                console.log('đây là user email',todo.user);
                const user = await User.findById(todo.user);
                if (user && user.email) {
                    console.log('đây là user email:', user.email);
                    // await SendEmailDeadline(user.email, 'Deadline approaching', `Your todo "${todo.title}" is approaching its deadline "${todo.deadline}".`);
             }}
        });
    } catch (error) {
        console.error('Error checking and sending deadline emails:', error.message);
    }
};
export const getAllTodo = async (request, response) => {
  try {
    const todos = await Todo.find({ user: request.user });
    if (todos.length === 0) {
      return response.status(404).json({ message: "No to-do list created yet" });
    }
    return response.status(200).json({
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
};
export const getOneTodo = async (request, response) => {
    const {id} = request.params;
  try {
    const todo = await Todo.findById(id);
    if(!todo){
        return response.status(404).json({message: "to do not found"});
    }
    if(todo.user.toString() !== request.user){
        return response.status(401).json({message: "not authorized", id_user_todo: todo.user.toString(), id_user_logged: request.user })
    }
    return response.status(200).json({message: "success", todo})
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
};
export const createTodo = async (request, response) => {
    const {title, description, level, deadline, category} = request.body;
    try {
        const todo = await Todo.create({
            title,
            description,
            completed: false,
            level,
            deadline: deadline,
            user: request.user,
            category
        })
        return response.status(201).json({message: "to do create successfully", todo});
    } catch (error) {
        console.log(error.message);
        response.status(500).json({message: error.message});
    }
};
export const updateTodo = async (request, response) => {
    const {id} = request.params;
    const {title, description,level, deadline, completed, category} = request.body;
    try {
        const todo = await Todo.findById(id);
        if(!todo){
            return response.status(404).json({message: "to-do not found"});
        }
        if(todo.user.toString() !== request.user){
            return response.status(401).json({message:"not authorized", id_user_todo: todo.user.toString(), id_user_logged: request.user});
        }
        todo.title = title;
        todo.description = description;
        todo.completed = completed;
        todo.level = level;
        todo.deadline = deadline;
        todo.category = category;
        await todo.save();
        return response.status(200).json({message :"to-do updated successfully", todo})
    } catch (error) {
        console.log(error.message);
        response.status(500).json({message: error.message});
    }
};
export const updateTodoLevel = async (request, response) => {
    const {id} = request.params;
    const {level} = request.body;
    try {
        const todo = await Todo.findById(id);
        if(!todo){
            return response.status(404).json({message: "to-do not found"});
        }
        if(todo.user.toString() !== request.user){
            return response.status(401).json({message:"not authorized", id_user_todo: todo.user.toString(), id_user_logged: request.user});
        }
        todo.level = level;
        await todo.save();
        return response.status(200).json({message :"level updated successfully", todo})
    } catch (error) {
        console.log(error.message);
        response.status(500).json({message: error.message});
    }
};

export const updateTodoCompleted = async (request, response) => {
    const {id} = request.params;
    const {completed} = request.body;
    try {
        const todo = await Todo.findById(id);
        if(!todo){
            return response.status(404).json({message: "to-do not found"});
        }
        if(todo.user.toString() !== request.user){
            return response.status(401).json({message:"not authorized", id_user_todo: todo.user.toString(), id_user_logged: request.user});
        }
        todo.completed = completed;
        await todo.save();
        return response.status(200).json({message :"status updated successfully", todo})
    } catch (error) {
        console.log(error.message);
        response.status(500).json({message: error.message});
    }
};

export const updateTodoDeadline = async (request, response) => {
    const {id} = request.params;
    const {deadline} = request.body;
    try {
        const todo = await Todo.findById(id);
        if(!todo){
            return response.status(404).json({message: "to-do not found"});
        }
        if(todo.user.toString() !== request.user){
            return response.status(401).json({message:"not authorized", id_user_todo: todo.user.toString(), id_user_logged: request.user});
        }
        todo.deadline = deadline;
        await todo.save();
        return response.status(200).json({message :"deadline updated successfully", todo})
    } catch (error) {
        console.log(error.message);
        response.status(500).json({message: error.message});
    }
};
export const deleteOneTodo = async (request, response) => {
    const {id} = request.params;
    try {
        const todo = await Todo.findById(id);
        if(!todo){
            return response.status(404).json({message:"to-do not found"});
        }
        if(todo.user.toString() !== request.user){
            return response.status(401).json({message: "not authorized", id_user_todo: todo.user.toString(), id_user_logged: request.user});
        }
        await todo.deleteOne({_id : request._id})
        return response.status(200).json({message:"to-do deleted successfully"});
    } catch (error) {
        console.log(error.message);
        response.status(500).json({message: error.message});
    }
};
export const deleteAllTodo = async (request, response) => {
    try {
        const todos = await Todo.find({user: request.user});
        if(todos.length === 0){
            return response.status(404).json({message:"have not todo"});
        }
        if(todos[0].user.toString() !== request.user){
            return response.status(401).json({message: "not authorized"});
        }
        await Todo.deleteMany({user: request.user})
        return response.status(200).json({message:"to-do deleted successfully"});
    } catch (error) {
        console.log(error.message);
        response.status(500).json({message: error.message});
    }
};
