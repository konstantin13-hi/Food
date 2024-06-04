import mongoose, {model, models} from "mongoose";
import bcrypt from "bcrypt";

const UserSchema
    = new mongoose.Schema({
    name: {type: String},
    email: {type: String, unique: true, required: true},
    password: {type: String},
    image: {type: String},
    streetAddress: {type: String},
    postalCode: {type: String},
    city: {type: String},
    country: {type: String},
    phone: {type: String},


}, {timestamps: true})


export const User = models?.User || model('User', UserSchema)
