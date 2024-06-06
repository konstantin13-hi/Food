
import mongoose, {model, models} from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
    image :{type:String},
    name :{type:String},
    base :{type:String},
    basePrice :{type:Number},

},{timestamps:true})

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);
