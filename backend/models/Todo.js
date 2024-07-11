import mongoose from "mongoose";
import TimeStamps from "../utils/TimeStamps.js";

const TodoSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        completed:{
            type: Boolean,
            required: true,
        },
        deadline:{ //Datetime picker
            type: String,
            required: true,
        },
        level:{ // 3 level high low medium
            type:String,
            required: true
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        category:{
            type: String,
            require:true
        }
    },{timestamps: false}
)

TimeStamps(TodoSchema);

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;