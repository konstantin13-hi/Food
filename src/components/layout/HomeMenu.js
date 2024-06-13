"use client"
import MenuItem from "../menu/MenuItem"
import SectionHeaders from "./SectionHeaders"
import {useEffect, useState} from "react";

export default function HomeMenu() {
    const [bestSellers, setBestSellers] = useState([])

    useEffect(() => {
        fetch('/api/menu-items').then(
            res => res.json().then(
                menuItems => {
                    setBestSellers(menuItems.slice(-3));

                }
            )
        )
    }, []);

    return (

        <section>
            <div className={"text-center mb-4"}>
                <SectionHeaders subHeader={"check out"} mainHeader={"Menu"}/>

            </div>


            <div className={"grid grid-cols-3 gap-4"}>
                {bestSellers?.length > 0 && (
                    bestSellers.map((bestSeller) => (
                        <MenuItem {...bestSeller}/>
                    ))
                )}
            </div>
            <section className={"text-center my-16"} id={"about"}>
                <SectionHeaders
                    subHeader={"Our story"}
                    mainHeader={"About us"}/>
                <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni minima odit recusandae. Illum
                        ipsa non repudiandae? Eum ipsam iste quos suscipit tempora? Aperiam esse fugiat inventore
                        laboriosam officiis quam rem!
                    </p>
                    <p>At consectetur delectus ducimus est facere iure molestias obcaecati quaerat vitae voluptate?
                        Aspernatur dolor explicabo iste minus molestiae pariatur provident quibusdam saepe?</p>
                    <p>Laborum molestias neque nulla obcaecati odio quia quod reprehenderit sit vitae voluptates? Eos,
                        tenetur.</p>

            </div>


        </section>
    <section className={"text-center"} id={"contact"}>
        <SectionHeaders subHeader={"Dont hesitate"} mainHeader={"Contact us"}/>
        <a className={""} href="tel:+44444444444">+4444444444</a>
    </section>

</section>
)
}
