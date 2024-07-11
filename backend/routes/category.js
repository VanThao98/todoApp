import express from "express";
import authorize from "../middleware/authorize.js";
import { getAllCategory, getOneCategory, createCategory, updateCategory, deleteOneCategory, deleteAllCategory } from "../controllers/categoriesController.js";
import { createCategory_valid, updateCategory_valid } from "../middleware/validator.js";
import { valid_result } from "../middleware/validationResult.js";

const route = express.Router();

route.get("/", authorize, getAllCategory);
route.get("/:id", authorize, getOneCategory);
route.post("/create", authorize, createCategory_valid, valid_result, createCategory);
route.put("/update/:id", authorize, updateCategory_valid, valid_result, updateCategory);
route.delete("/delete/all", authorize, deleteAllCategory);
route.delete("/delete/:id", authorize, deleteOneCategory);

export default route;