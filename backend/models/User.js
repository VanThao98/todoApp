import mongoose from "mongoose";
import TimeStamps from "../utils/TimeStamps.js";

const UserSchema = mongoose.Schema(      
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        }
    },{
        timestamps:false
    }
)

TimeStamps(UserSchema);

const User = mongoose.model("User", UserSchema);

export default User;