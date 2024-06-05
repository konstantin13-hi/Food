"use client"
import {useEffect, useState} from "react";
import UserTabs from "../../components/layout/UserTabs";

export default function CategoriesPage() {

    const [isAdmin, setIsAdmin] = useState(false);
    const [adminInfoLoading,setAdminInfoLoading] = useState(true);
    useEffect(() => {
        fetch('/api/profile').then((response) => {
            return response.json().then(data =>{
                setIsAdmin(data.admin);
                setAdminInfoLoading(false)
            });
        })
    }, []);
    if(!isAdmin){
        return 'Not an Admin';
    }
    if (adminInfoLoading) {
        return "Loading info";
    }

    return(
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={isAdmin}/>
        </section>
    )
}
