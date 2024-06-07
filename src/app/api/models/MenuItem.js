
import mongoose, {model, models,Schema} from 'mongoose';


const ExtraPriceSchema = new Schema({
    name: String,
    price: Number,

})



const MenuItemSchema = new mongoose.Schema({
    image :{type:String},
    name :{type:String},
    description :{type:String},
    basePrice :{type:Number},
    sizes:{type:[ExtraPriceSchema]},
    extraIngredientPrices :{type:[ExtraPriceSchema]},
    extraIngredients:{}

},{timestamps:true})

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);
