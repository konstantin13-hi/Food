"use client"
import {useProfile} from "../../../components/UserProfile";
import {useState} from "react";
import toast from "react-hot-toast";
import UserTabs from "../../../components/layout/UserTabs";
import EditableImage from "../../../components/layout/EditableImage";
import Link from "next/link";
import Right from "../../../components/icons/Right";
import {redirect} from "next/navigation";
import MenuItemForm from "../../../components/layout/MenuItemForm";

export default function NewMenuItemPage(){
     const[redirectToItems,setRedirectToItems] = useState(false);
    const [menuItem,setMenuItem] = useState(null);
    const {loading, data} = useProfile();const [basePrice,setBasePrice] = useState('');

    async function handleFormSubmit(ev,data){
        ev.preventDefault();
        console.log("handleFormSubmit");
        console.log(data);
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-type': 'application/json'},

            })
            if (response.ok) {
                resolve();
                setRedirectToItems(true);
            }
            else {
                reject();
            }
        })

        await toast.promise(savingPromise, {
            loading: 'Saving items...',
            success: 'Items saved!',
            error: 'Error',
        })




    }
    if(redirectToItems){
        return redirect('/menu-items')
    }


    if (loading) {
        return 'Loading ...';
    }
    if(!data.admin){
        return 'Not a admin';
    }
    return (
        <section className="mt-8">
            <UserTabs isAdmin={true}/>
            <div className="max-w-md mx-auto mt-8">
            <Link href={"/menu-items"}>
                <span>Show all menu items</span>
                <Right/>
            </Link>
            </div>
            <MenuItemForm menuItem={null} onSubmit={handleFormSubmit}></MenuItemForm>


        </section>
    )




}
