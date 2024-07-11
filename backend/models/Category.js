import mongoose from "mongoose";
import TimeStamps from "../utils/TimeStamps.js";

const CategorySchema = mongoose.Schema(
    {
        categoryName:{
            type:String,
            required: true,
            trim: true
        },
        description:{
            type: String,
            trim: true
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timeStamps:false,
    }
)

TimeStamps(CategorySchema);

const Category = mongoose.model("Category", CategorySchema);

export default Category;