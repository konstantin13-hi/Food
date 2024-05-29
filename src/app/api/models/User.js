import mongoose, {model,models} from "mongoose";

const UserSchema
    = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
},{ timestamps: true })


export const User =models?.User || model('User', UserSchema)
