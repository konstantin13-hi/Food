import Link from "next/link";

export default function Header(){
    return (
        <header className={"flex items-center justify-between w-full"}>
            <nav className={"flex gap-4 items-center font-semibold text-gray-500"}>
                <Link className={"text-primary font-semibold text-3xl"} href="/"> Pizza </Link>
                <Link href="">Home</Link>
                <Link href="">Menu</Link>
                <Link href="">About</Link>
                <Link href="">Contact</Link>
                  </nav>
            <nav className={"flex items-center gap-4 text-gray-500"}>
                <Link href="/register">Register</Link>
                <Link href="" className={"bg-primary rounded-full text-white px-8 py-4"}>Login</Link>


            </nav>

        </header>
    )
}
