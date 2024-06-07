import {useState} from "react";

export default function MenuItemPriceProps({name,addLabel,props,setProps}){
    const [isOpen,setIsOpen] = useState(false);

    function addProp() {
        setProps(oldProps => {
            return [...oldProps, {name: name, price: 0}];
        })
    }
    function editProp(ev,index,prop) {
        const newValue = ev.target.value;
        setProps(prevSizes=>{
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;

        })
    }

    function removeProp(indexToRemove) {
        setProps(prev => prev.filter((v, index) => index !== indexToRemove))
    }

    return (
        <div className={"bg-gray-200 p-2 rounded-md mb-2"}>
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className={"inline-flex p-1 border-0 justify-start"}
                type="button">
                {isOpen && (
                    <>↑</>
                )}
                {!isOpen && (
                    <>
                        ↓
                    </>
                )}
                <span>{name}</span>
                <span>({props?.length})</span>

            </button>
            <div className={isOpen ? 'block' : 'hidden'}>


            {props?.length > 0 && props.map(((size, index) => (
                <div className={"flex gap-2 items-end"} key={index}>
                    <div>
                        <label>Name</label>
                        <input type="text" placeholder="Size name" value={size.name}
                               onChange={ev => editProp(ev, index, 'name')}/>
                    </div>
                    <div>
                        <label>Extra price</label>
                        <input type={"text"} placeholder={"Extra price"} value={size.price}
                               onChange={ev => editProp(ev, index, 'price')}/>
                    </div>
                    <div>
                        <button onClick={() => removeProp(index)}
                                type={"button"} className={"bg-white mb-2"}>X
                        </button>
                    </div>
                </div>
            )))}
            <button type={"button"}
                    onClick={addProp}
                    className={"bg-white "}>
                <span>{addLabel}</span>
            </button>
            </div>

        </div>


    );

}
