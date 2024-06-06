"use client"
import {useProfile} from "../../../../components/UserProfile";
import {useEffect, useState} from "react";
import UserTabs from "../../../../components/layout/UserTabs";
import Link from "next/link";
import Right from "../../../../components/icons/Right";
import Image from "next/image";
import toast from "react-hot-toast";
import {redirect, useParams} from "next/navigation";
import EditableImage from "../../../../components/layout/EditableImage";


export default function EditMenuItemPage(){
    const [image, setImage] = useState('');
    const {loading, data} = useProfile();
    const [name,setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice,setBasePrice] = useState('');
    const[redirectToItems,setRedirectToItems] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        fetch('/api/menu-items').then(
            response =>
               response.json().then(
                   data=>{
                       const item = data.find(item => item._id === id);
                       console.log(item);
                       setImage(item.image);
                       setName(item.name);
                       setDescription(item.description);
                       setBasePrice(item.basePrice);
                   }
               )

        )
    }, []);


    async function handleFormSubmit(ev){
        ev.preventDefault();
        const data = {image,name,description,basePrice,_id:id};
        console.log(data);
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
            <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
                <div className="flex items-start gap-4">
                    <div >
                        <EditableImage link={image} setLink={setImage}/>
                    </div>
                    <div className="grow">
                        <label>Item name</label>
                        <input
                            value={name}
                            type="text"
                            onChange={ev => setName(ev.target.value)}
                        />
                        <label>D</label>
                        <input
                            value={description}
                            type="text"
                            onChange={ev => setDescription(ev.target.value)}
                        />
                        <label>Price</label>
                        <input
                            value={basePrice}
                            type="text"
                            onChange={ev => setBasePrice(ev.target.value)}
                        />
                        <button type="submit">Save</button>
                    </div>

                </div>

            </form>

        </section>
    )



}
