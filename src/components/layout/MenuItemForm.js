import EditableImage from  "./EditableImage";
import {useState} from "react";

export default function MenuItemForm({onSubmit,menuItem}) {
    const [image, setImage] = useState(menuItem?.image || '');
     const [name,setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice,setBasePrice] = useState(menuItem?.basePrice || '');

    return (
        <form onSubmit={ev=>onSubmit(ev,{image,name,description,basePrice})} className="mt-8 max-w-md mx-auto">
            <div className="flex items-start gap-4">
                <div>
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
    )
}
