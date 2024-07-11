import express from "express";
import authorize from "../middleware/authorize.js";
import { getAllTodo, getOneTodo, createTodo, updateTodo, deleteOneTodo, deleteAllTodo, updateTodoLevel, updateTodoDeadline, updateTodoCompleted } from "../controllers/todosController.js";
import { createTodo_valid, updateTodo_valid } from "../middleware/validator.js";
import { valid_result } from "../middleware/validationResult.js";

const route = express.Router();

route.get("/", authorize, getAllTodo);
route.get("/:id", authorize, getOneTodo);
route.post("/create", authorize, createTodo_valid, valid_result, createTodo);
route.put("/update/:id", authorize, updateTodo_valid, valid_result, updateTodo);
route.put("/update/:id/completed", authorize, valid_result, updateTodoCompleted);
route.put("/update/:id/deadline", authorize, valid_result, updateTodoDeadline);
route.put("/update/:id/level", authorize, valid_result, updateTodoLevel);
route.delete("/delete/all", authorize, deleteAllTodo);
route.delete("/delete/:id", authorize, deleteOneTodo);

export default route;