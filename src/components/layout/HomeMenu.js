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
                <div className={"max-w-2xl"}>
                    <p className={"max-w-2xl mx-auto mt-4 text-gray-500"}>
                        lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </p>
                    <p> lorem ipsum </p>
                </div>


            </section>
            <section className={"text-center"} id={"contact"}>
                <SectionHeaders subHeader={"Dont hesitate"} mainHeader={"Contact us"}/>
                <a className={""} href="tel:+44444444444">+4444444444</a>
            </section>

        </section>
    )
}
