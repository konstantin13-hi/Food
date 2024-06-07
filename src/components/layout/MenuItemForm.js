import EditableImage from "./EditableImage";
import {useState} from "react";
import {remove} from "next/dist/build/webpack/loaders/resolve-url-loader/lib/file-protocol";
import MenuItemPriceProps from "./MenuItemPriceProps";

export default function MenuItemForm({onSubmit, menuItem}) {
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);



    return (
        <form onSubmit={ev =>
            onSubmit(ev, {image, name, description,
                basePrice,sizes,
            extraIngredientPrices})} className="mt-8 max-w-md mx-auto">
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
                    <MenuItemPriceProps name={"Sizes"}
                                        addLabel={"Add item size"}
                                        props={sizes}
                                        setProps={setSizes}/>
                    <MenuItemPriceProps name={"Base Price"}
                    addLabel={"Add ingredients prices"}
                    props={extraIngredientPrices}
                    setProps={setExtraIngredientPrices}/>

                    <button type="submit">Save</button>
                </div>


            </div>

        </form>
    )
}
