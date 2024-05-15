import Link from "next/link";

export default function Header(){
    return (
        <header className={"flex items-center justify-between w-full"}>
            <Link className={"text-primary font-semibold text-3xl"} href="/"> Pizza </Link>
            <nav className={"flex gap-4 items-center font-semibold text-gray-500"}>
                <Link href="">Home</Link>
                <Link href="">Menu</Link>
                <Link href="">About</Link>
                <Link href="">Contact</Link>
                <Link href="" className={"bg-primary rounded-full text-white px-8 py-4"}>Login</Link>
            </nav>

        </header>
    )
}
