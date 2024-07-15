import express from "express";
import { PORT, mongoDB_url2 } from "./config.js";
import TodosRoutes from "./routes/todos.js";
import UsersRoutes from "./routes/users.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dayjs from "dayjs";
import CategoryRoutes from './routes/category.js';
import cors from 'cors';

const app = express();
app.use(cookieParser()); // use cookiesParser
app.use(express.json());
app.use(cors());
app.use('/api/todos', TodosRoutes)
app.use('/api/users', UsersRoutes)
app.use('/api/categories', CategoryRoutes)
app.get('/', (request, response) =>{
    console.log(request);
    return response.status(222).send('<h1>welcome to my to do list</h1>');
})

mongoose
    .connect( mongoDB_url2)
    .then(()=>{
        console.log("app connect to database");
        app.listen(PORT, ()=>{
            console.log(`app is listenning to PORT ${PORT}`);
        })
        // const utcTime = moment.tz('Asia/Ho_Chi_Minh').toDate();
        console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'));
        // console.log(moment.Date())
    })
    .catch((error)=>{
        console.log(error);
    })