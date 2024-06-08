import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
    return (
        <section className={"grid grid-cols-2"}>
            <div>


                <h1 className={"text-4xl font-semibold"}>
                   Food is better than your Girlfriend
                </h1>

                <p className={"text-gray-500 my-4"}>Enjoy food and have fun</p>

                <div className={"flex gap-4"}>
                    <button className={"bg-primary flex gap-2  text-white px-4 py-2 rounded-full"}>Order now
                    <Right/>
                    </button>
                    <button className={"flex gap-2 text-gray-500 py-2 font-semibold"}>Learn now
                    <Right/>
                    </button>
                </div>
            </div>

            {/*<div className={"relative"}>*/}
            {/*    <Image src={"/pizza.png"} alt={"pizza"} layout={'fill'}*/}
            {/*    objectFit={"contain"}></Image>*/}
            {/*</div>*/}



        </section>
    )
}
