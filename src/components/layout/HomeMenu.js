import Image from "next/image";
import MenuItem from "@/components/menu/MenuItem";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function HomeMenu() {
    return (

        <section>
         <div className={"text-center mb-4"}>
       <SectionHeaders subHeader={"check out"} mainHeader={"Menu"} />

         </div>


            <div className={"grid grid-cols-3 gap-4"}>
                <MenuItem/>
                <MenuItem/>
                <MenuItem/>
                <MenuItem/>
                <MenuItem/>

            </div>
            <section className={"text-center my-16"}>
                <SectionHeaders
                    subHeader={"Our story"}
                    mainHeader={"About us"} />
                <div className={"max-w-2xl"}>
                    <p className={"max-w-2xl mx-auto mt-4 text-gray-500"}>
                        lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </p>
                    <p> lorem ipsum </p>
                </div>
                <section>
                    <SectionHeaders subHeader={"Dont hesitate"} mainHeader={"Contact us"}/>
                    <a className={""} href = "tel:+44444444444">+4444444444</a>
                </section>

                <footer className={"border-t p-8 text-gray-500 mt-8"}>
                    &copy; 2024 all rights reserved
                </footer>




            </section>

        </section>
    )
}
