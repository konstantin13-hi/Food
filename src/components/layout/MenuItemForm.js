import EditableImage from "./EditableImage";
import {useEffect, useState} from "react";
import {remove} from "next/dist/build/webpack/loaders/resolve-url-loader/lib/file-protocol";
import MenuItemPriceProps from "./MenuItemPriceProps";

export default function MenuItemForm({onSubmit, menuItem}) {
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);

    const [category, setCategory] = useState(menuItem?.category || '');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            });
        });
    }, []);

    useEffect(() => {
        if (!category && categories?.length > 0) {
            setCategory(categories[0]._id);
        }
    }, [categories, category]);

    return (
        <form onSubmit={ev =>
            onSubmit(ev, {image, name, description,
                basePrice,sizes,category, extraIngredientPrices})}
              className="mt-8 max-w-md mx-auto">
            <div className="grid items-start gap-4"
            style={{gridTemplateColumns:'.3fr .7fr'}}>
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
                    <label>Description</label>
                    <input
                        value={description}
                        type="text"
                        onChange={ev => setDescription(ev.target.value)}
                    />
                    <label>Category</label>
                    <select value={category} onChange={ev => setCategory(ev.target.value)}>
                        {categories?.length > 0 && categories.map(c => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>
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
