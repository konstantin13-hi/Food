'use client'
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {useContext} from "react";
import {CartContext} from "../../components/AppContext";
import ShoppingCart from "../../components/icons/ShoppingCart";

export default function Header(){
    const session = useSession();
    const status = session.status;
    console.log(status);
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    const {cartProducts} = useContext(CartContext);
    return (
        <header className={"flex items-center justify-between w-full"}>
            <nav className={"flex gap-4 items-center font-semibold text-gray-500"}>
                <Link className={"text-primary font-semibold text-3xl"} href="/"> ₣◎◎Đ</Link>
                <Link href="">Home</Link>
                <Link href="/menu">Menu</Link>
                <Link href="/#about">About</Link>
                <Link href="/#contact">Contact</Link>
                  </nav>
            <nav className={"flex items-center gap-4 text-gray-500"}>
                {status==="authenticated" && (
                    <>
                    <Link href={'/profile'}>{userName}</Link>
                <button className={""} onClick={()=>signOut()}>Log out</button>
                    </>
                )}
                {status==="unauthenticated" && (
                    <>
                    <Link href="/register">Register</Link>
                    <Link href="/login" className={"bg-primary rounded-full text-white px-8 py-4"}>Login</Link>
                    </>
            )}
                <Link href={'/cart'} className="relative">
                    <ShoppingCart />
                    {cartProducts?.length > 0 && (
                        <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
            {cartProducts.length}
          </span>
                    )}
                </Link>


            </nav>

        </header>
    )
}
