import mongoose, {model, models} from "mongoose";

const UserInfoSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    streetAddress: {type: String},
    postalCode: {type: String},
    city: {type: String},
    country: {type: String},
    phone: {type: String},
    admin : {type: Boolean, default: false}
})

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema);
