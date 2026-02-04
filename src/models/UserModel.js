import mongoose from "mongoose";
import { maxLength, minLength } from "zod";



const UserSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique : true,
        trime : true,
        minLength: 6,
        maxLength:254,
    },
    password:{
        type: String,
        required: true,
        unique : true,
        trime : true,
        minLength: 6,
        maxLength:254,
    },
    username:{
        type: String,
        default : "",
        required: true,
        trime : true,
        minLength: 3,
        maxLength:29,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }

})

export default mongoose.model("User", UserSchema);