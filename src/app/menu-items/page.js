"use client"
import {useProfile} from "../../components/UserProfile";
import UserTabs from "../../components/layout/UserTabs";
import EditableImage from "../../components/layout/EditableImage";
import {useState} from "react";
import toast from "react-hot-toast";

export default function MenuItemsPage() {
    const [image, setImage] = useState('');
    const {loading, data} = useProfile();
    const [name,setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice,setBasePrice] = useState('');

    async function handleFormSubmit(ev){
        ev.preventDefault();
        const data = {image,name,description,basePrice};
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-type': 'application/json'},

            })
            if (response.ok) {
                resolve();
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
    if (loading) {
        return 'Loading ...';
    }
    return (
        <section className="mt-8">
            <UserTabs isAdmin={true}/>
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
                        <label>Item name</label>
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

