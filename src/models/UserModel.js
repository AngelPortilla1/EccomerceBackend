import mongoose from "mongoose";
import { maxLength, minLength } from "zod";



const UserSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique : true,
        trim : true,
        minLength: 6,
        maxLength:254,
    },
    password:{
        type: String,
        required: true,
        trim : true,
        minLength: 6,
        maxLength:254,
    },
    username:{
        type: String,
        required: true,
        unique : true,
        trim : true,
        minLength: 3,
        maxLength:29,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }

})

export default mongoose.model("User", UserSchema);