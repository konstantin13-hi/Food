'use client'
import {useContext} from "react";
import {CartContext} from "../../components/AppContext";




export default function MenuItem(menuItem) {
    const {image,name,description,basePrice
        ,sizes,extraIngredientPrices} = menuItem;

    const {addToCart} = useContext(CartContext);
return (
    <div className={"bg-gray-300 px-4 rounded-lg text-center hover:bg-amber-50 hover:shadow-2xl hover:shadow-black/50"}>
        <div className={"text-center"}>
            <img src={image} alt={name} className={"max-h-auto max-h-24 block mx-auto"}/>
        </div>
        <h4 className={"font-semibold text-xl my-3"}>{name}</h4>
        <p className={"text-gray-500 text-sm line-clamp"}>{description} </p>
        <button
            onClick={()=>addToCart(menuItem)}
            className={"mt-4 bg-primary text-white rounded-full px-6 py-2"}>
            add to cart ${basePrice}</button>


    </div>
)

}
