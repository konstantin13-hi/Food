'use client';
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import Image from "next/image";
import {useEffect, useState} from "react";
import InfoBox from "../../components/layout/InfoBox";
import SuccessBox from "../../components/layout/SuccessBox";
import toast, {Toaster} from 'react-hot-toast';
import Link from "next/link";
import UserTabs from "../../components/layout/UserTabs";
import EditableImage from "../../components/layout/EditableImage";
import UserForm from "../../components/layout/UserForm";


export default function ProfilePage() {
    const session = useSession();
    const {status} = session;

    const [image, setImage] = useState('');
    const [userName, setUserName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
   const [user, setUser] = useState(null);
    useEffect(() => {
        if (status === "authenticated") {
            setUserName(session.data.user.name);
            setImage(session.data.user.image)
            fetch('/api/profile').then(
                response => {
                    response.json().then(
                        data => {
                            setUser(data);
                            setIsAdmin(data.admin);
                            setProfileFetched(true);
                        }
                    )
                }
            )
        }

    }, [session, status]);

    async function handleProfileInfo(ev,data) {
        ev.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });
            if (response.ok)
                resolve()
            else
                reject();
        });

        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Error',
        });

    }


    if (status === "loading" || !profileFetched) {
        return 'Loading ...';
    }

    if (status === "unauthenticated") {
        return redirect("/login");
    }





    const userImage = session.data.user.image;
    return (
        <section>
            <UserTabs isAdmin={isAdmin}/>


            <div className={"max-w-md mx-auto "}>
                <UserForm user={user} onSave={handleProfileInfo} />

            </div>
        </section>
    )
}
