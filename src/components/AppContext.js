'use client'

import {SessionProvider} from "next-auth/react";
import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({});

export function AppProvider({ children }) {
   const [cartProducts, setCartProducts] = useState([]);
   const ls = typeof window !== "undefined"  ? window.localStorage : null;

   function saveCartProductToLocalStorage(){
       if(ls){
           ls.setItem('cart', JSON.stringify(cartProducts));
       }
   }

    useEffect(() => {
        if(ls && ls.getItem('cart')){
            setCartProducts(JSON.parse(ls.getItem('cart')));
        }
    }, []);

   function clearCart(){
       setCartProducts([]);
       saveCartProductToLocalStorage([]);
   }

   function removeCartProduct(index){
    setCartProducts(prevCartProducts=>{
        const newCartProducts = prevCartProducts.filter((v,i)=>i!==index);
       saveCartProductToLocalStorage(newCartProducts);
        return newCartProducts;
    })
   }

   function addToCart(product,size=null,extras=[]) {
       setCartProducts(prevProducts =>{
           const cartProducts = {...prevProducts,size,extras};
          saveCartProductToLocalStorage([...prevProducts, cartProducts]);
           return [...prevProducts, cartProducts];
       })

   }
    return (
        <SessionProvider>
            <CartContext.Provider value={
                {cartProducts,setCartProducts,addToCart,removeCartProduct,clearCart}}>


            {children}
            </CartContext.Provider>
        </SessionProvider>
    )
}
