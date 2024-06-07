"use client"
import {useProfile} from "../../../../components/UserProfile";
import {useEffect, useState} from "react";
import UserTabs from "../../../../components/layout/UserTabs";
import Link from "next/link";
import Right from "../../../../components/icons/Right";
import toast from "react-hot-toast";
import {redirect, useParams} from "next/navigation";
import MenuItemForm from "../../../../components/layout/MenuItemForm";
import DeleteButton from "../../../../components/DeleteButton";


export default function EditMenuItemPage(){
     const {loading, data} = useProfile();const [basePrice,setBasePrice] = useState('');
    const[redirectToItems,setRedirectToItems] = useState(false);
    const {id} = useParams();
    const [menuItem,setMenuItem] = useState(null);

    useEffect(() => {
        fetch('/api/menu-items').then(
            response =>
               response.json().then(
                   data=>{
                       const item = data.find(item => item._id === id);
                       setMenuItem(item);

                   }
               )

        )
    }, []);


    async function handleFormSubmit(ev,data){
        ev.preventDefault();
        data = {...data,_id:id};
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
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

   async function handleDeleteClick(){
        const promise = new Promise(async (resolve, reject) => {
        const res = await fetch(`/api/menu-items?_id=`+id, {
                method: 'DELETE',


            })
            if (res.ok){
                resolve();
                setRedirectToItems(true);
            }
            else {
                reject();
            }
        })
       await toast.promise(promise,{
           loading :'Deleting ...',
           success:'Deleting successful!',
           error:'Deleting failed...',
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

            <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit}></MenuItemForm>
            <div className={"max-w-md mx-auto mt-4"}>
                <div className={"max-w-xs ml-auto pl-4"}>
                    <DeleteButton label={"Delete this item"} onClick={handleDeleteClick}/>

                </div>
            </div>


        </section>
    )



}
