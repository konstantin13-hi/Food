import mongoose, {model, models} from "mongoose";
import bcrypt from "bcrypt";

const UserSchema
    = new mongoose.Schema({
    name: {type: String},
    email: {type: String, unique: true, required: true},
    password: {
        type: String, required: true, validate: pass => {
            if (pass.length < 5) {
                return Error("Password must be at least 5 characters")
            }
        }
    },

}, {timestamps: true})

UserSchema.post("validate", function (user) {
    const pass = user.password;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(pass, salt);
})


export const User = models?.User || model('User', UserSchema)
