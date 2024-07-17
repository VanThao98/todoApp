import express from "express";
import { sendEmailController } from "../controllers/EmailController.js";

const route = express.Router();

route.post("/sendemail", sendEmailController);

export default route;