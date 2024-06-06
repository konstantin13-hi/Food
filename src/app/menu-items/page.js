"use client"
import {useProfile} from "../../components/UserProfile";
import UserTabs from "../../components/layout/UserTabs";
import EditableImage from "../../components/layout/EditableImage";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Right from "../../components/icons/Right";
import Image from 'next/image';

export default function MenuItemsPage() {
    const {loading, data} = useProfile();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items').then(
            response => response.json().then(
                data => setMenuItems(data)
            )
        )
    }, []);


    if (loading) {
        return 'Loading ...';
    }
    if (!data.admin) {
        return 'Not a admin';
    }
    return (
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true}/>
            <div className={"mt-8"}>
                <Link className={"button"}
                      href={"/menu-items/new"}>Create new
                    <span>

                </span>
                    <Right/>
                </Link>

            </div>
            <div>

                <h2 className={"text-sm text-gray-500 mt-8"}></h2>
                <div className="grid grid-cols-3 gap-2">
                    {menuItems.length > 0 && (
                        menuItems.map(menuItem => (
                            <Link href={"/menu-items/edit/" + menuItem._id} className={"button mb-1"}
                                  key={menuItem._id}>
                                <div className="relative">
                                    <Image
                                        className="rounded-md"
                                        src={menuItem.image} alt={''} width={200} height={200}/>
                                </div>
                                <div className="text-center">
                                    {menuItem.name}
                                </div>
                            </Link>

                        ))
                    )

                    }
                </div>
            </div>


        </section>
    )
}

