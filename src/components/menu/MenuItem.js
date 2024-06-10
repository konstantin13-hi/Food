'use client'
import {useContext, useState} from "react";
import {CartContext} from "../../components/AppContext";
import toast from "react-hot-toast";
import MenuItemTitle from "../../components/menu/MenuItemTitle";
import Image from "next/image";


export default function MenuItem(menuItem) {
    const {
        image, name, description, basePrice
        , sizes, extraIngredientPrices
    } = menuItem;
    const [showPopup, setShowPopup] = useState(false);
    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const {addToCart} = useContext(CartContext);
    const [selectedExtras, setSelectedExtras] = useState([]);

    async function handleAddCartButtonClick() {
        console.log('add to cart');
        const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
        if (hasOptions && !showPopup) {
            setShowPopup(true);
            return;
        }
        addToCart(menuItem, selectedSize, selectedExtras);
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('hiding popup');
        setShowPopup(false);
    }

    function handleExtraThingClick(ev, extraThing) {
        const checked = ev.target.checked;
        if (checked) {
            setSelectedExtras(prev => [...prev, extraThing]);
        } else {
            setSelectedExtras(prev => {
                return prev.filter(e => e.name !== extraThing.name);
            });
        }
    }

    let selectedPrice = basePrice;
    if (selectedSize) {
        selectedPrice += selectedSize.price;
    }
    if (selectedExtras?.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += extra.price;
        }
    }

    return (

        <>
            {showPopup && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
                    <div className={"bg-white max-w-md"}
                         onClick={(ev) => ev.stopPropagation()}>
                        <div
                            style={{maxHeight: 'calc(100vh - 10px)'}}
                            className="overflow-y-scroll p-2">
                            <Image
                                src={image}
                                alt={name}
                                width={300} height={200}
                                className="mx-auto"/>
                            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                            <p className="text-center text-gray-500 text-sm mb-2">
                                {description}
                            </p>

                            {sizes.map(size => (
                                <label
                                    key={size._id}
                                    className="flex items-center gap-2 p-4 border rounded-md mb-1">
                                    <input
                                        type="radio"
                                        onChange={() => setSelectedSize(size)}
                                        checked={selectedSize?.name === size.name}
                                        name="size"/>
                                    {size.name} ${basePrice + size.price}
                                </label>
                            ))}

                            {extraIngredientPrices?.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-center text-gray-700">Any extras?</h3>
                                    {extraIngredientPrices.map(extraThing => (
                                        <label
                                            key={extraThing._id}
                                            className="flex items-center gap-2 p-4 border rounded-md mb-1">
                                            <input
                                                onChange={ev => handleExtraThingClick(ev, extraThing)}
                                                checked={selectedExtras.map(e => e._id).includes(extraThing._id)}
                                                type="checkbox"
                                                name={extraThing.name}/>
                                            {extraThing.name} +${extraThing.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            <button className={"primary"} type={"button"}>
                                Add to cart ${selectedPrice}
                            </button>
                            <button
                                className="mt-2"
                                onClick={() => setShowPopup(false)}>
                                Cancel
                            </button>

                        </div>
                    </div>

                </div>
            )}

            <MenuItemTitle onAddToCart={handleAddCartButtonClick} {...menuItem}/>
        </>

    )

}
