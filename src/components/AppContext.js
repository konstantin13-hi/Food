'use client'

import {SessionProvider} from "next-auth/react";
import {createContext, useState} from "react";

export const CartContext = createContext({});

export function AppProvider({ children }) {
   const [cartProducts, setCartProducts] = useState([]);

   function addToCart(product,size=null,extras=[]) {
       setCartProducts(prevProducts =>{
           const cartProducts = {...prevProducts,size,extras};
           return [...prevProducts, cartProducts];
       })

   }
    return (
        <SessionProvider>
            <CartContext.Provider value={
                {cartProducts,setCartProducts,addToCart}}>


            {children}
            </CartContext.Provider>
        </SessionProvider>
    )
}
