'use client'
import {useEffect, useState} from "react";
import SectionHeaders from "../../components/layout/SectionHeaders";
import MenuItem from '../../components/menu/MenuItem'

export default function MenuPage(){
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    console.log(menuItems);
    useEffect(() => {
        fetch('/api/categories').
        then(res => res.json()
        .then(categories =>
            setCategories(categories))
        )
        fetch('/api/menu-items').then(
            res => res.json().then(
                menuItems => {
                    setMenuItems(menuItems);
                }
            )
        )
    }, []);
    return(
        <section>
            {categories?.length > 0 && (
                categories.map((category, categoryIndex) => (
                    <div key={categoryIndex} >
                        <div className="text-center">
                            <SectionHeaders mainHeader={category.name} />
                        </div>
                        <div className={"grid grid-cols-3 gap-1 mb-4"}>
                        {menuItems
                            .filter(menuItem => menuItem.category === category._id)
                            .map((menuItem, menuItemIndex) => (

                             <MenuItem {...menuItem}></MenuItem>
                            ))}
                        </div>
                    </div>
                ))
            )}

        </section>
    )
}
