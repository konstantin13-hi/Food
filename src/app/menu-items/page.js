"use client"
import {useProfile} from "../../components/UserProfile";

export default function MenuItemsPage() {

    const {loading,data} =useProfile();
    if(loading){
        return 'Loading ...';
    }
    return (
        <section className={"mt-8"}>
            dsds

        </section>
    )
}
