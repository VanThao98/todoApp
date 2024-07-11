import express from "express";
import { getAllUser, register, login, logout, updatePassword, updateDetail, deleteUser, getMe } from "../controllers/usersController.js";
import authorize from "../middleware/authorize.js";
import { login_valid, register_valid, updateDetail_valid, updatePassword_valid } from "../middleware/validator.js";
import { valid_result } from "../middleware/validationResult.js";

const route = express.Router();

route.get('/', getAllUser),
route.post("/register", register_valid, valid_result, register);
route.post('/login', login_valid, valid_result, login);
route.get('/logout', logout);
route.get('/me',authorize, getMe);
route.put('/updatedetail',authorize, updateDetail_valid, valid_result, updateDetail);
route.put('/updatepassword',authorize, updatePassword_valid, valid_result, updatePassword);
route.delete('/delete',authorize, deleteUser);

export default route;