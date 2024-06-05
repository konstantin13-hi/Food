'use client';
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import Image from "next/image";
import {useEffect, useState} from "react";
import InfoBox from "../../components/layout/InfoBox";
import SuccessBox from "../../components/layout/SuccessBox";
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";
import UserTabs from "../../components/layout/UserTabs";


export default function ProfilePage() {
    const session = useSession();
    const {status} = session;
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [image, setImage] = useState('');
    const [userName, setUserName] = useState('');
    const[isUploading, setIsUploading] = useState(false);
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);

    useEffect(() => {
        if (status === "authenticated") {
            setUserName(session.data.user.name);
            setImage(session.data.user.image)
            fetch('/api/profile').then(
                response => {
                    response.json().then(

                        data =>
                        {
                            console.log(data)
                            setPhone(data.phone)
                            setStreetAddress(data.streetAddress)
                            setPostalCode(data.postalCode)
                            setCity(data.city)
                            setCountry(data.country)
                            setIsAdmin(data.admin)
                            setProfileFetched(true)


                        }
                    )
                }
            )
        }

    }, [session, status]);


    if (status === "loading" || !profileFetched) {
        return 'Loading ...';
    }

    if (status === "unauthenticated") {
        return redirect("/login");
    }

    async function handleProfileInfo(ev) {
        ev.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                name: userName ,
                image:image,
                streetAddress:streetAddress,
                city:city,
                country:country,
                phone:phone,
                postalCode:postalCode,
                }),
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

    async function handleFileChange(ev) {
        const file = ev.target.files[0];
        if (file.size > 0) {


            const data = new FormData();
            data.set('file', file);

            const uploadPromise = new Promise(async (resolve, reject) => {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: data,
                })
                if (response.ok) {
                    const result = await response.json();
                    const link = result.link;
                    setImage(link);
                    resolve();
                }
                else {
                    reject();
                }

            });
            await toast.promise(uploadPromise,{
                loading: 'Uploading...',
                success: 'Upload successful!',
                error: 'Upload failed...',
            });

        }

    }


    const userImage = session.data.user.image;
    return (
        <section>
            <UserTabs isAdmin={isAdmin}/>


            <div className={"max-w-md mx-auto "}>
                {/*{saved && (*/}
                {/*    <SuccessBox>Saved!</SuccessBox>)*/}
                {/*}*/}

                {/*{isSaving && (*/}
                {/*    <InfoBox>Saving</InfoBox>)}*/}

                {/*{isUploading && (*/}
                {/*    <InfoBox>Uploading</InfoBox>)}*/}



                <div className={"flex gap-10"}>


                    <div className="flex justify-center">
                        <div className={"bg-gray-300 p-4 rounded-lg w-50 "}>
                            {image && (
                                <Image className={"rounded-lg mb-1"}  src={image} width={250} height={64}
                                       alt={'avatar'}></Image>
                            )}

                            <label>
                                <input type={"file"} className={"hidden"} onChange={handleFileChange}/>
                                <span className={"block border rounded-lg text-center cursor-pointer"}>Edit</span>
                            </label>
                        </div>
                    </div>
                    <form className={"grow"} onSubmit={handleProfileInfo}>

                        <input type={"text"} placeholder={"First Name"} value={userName}
                               onChange={ev => setUserName(ev.target.value)}/>
                        <input type={"email"} disabled={true} placeholder={session?.data?.user?.email}/>
                        <input type={"tel"} placeholder={"Phone number"}
                        value={phone} onChange={ev=>setPhone(ev.target.value)}/>
                        <input type={"text"} placeholder={"Street address"}
                        value={streetAddress} onChange={ev=>setStreetAddress(ev.target.value)}/>
                        <div className={"flex gap-4"}>
                            <input type={"text"} placeholder={"City"}
                            value={city} onChange={ev=>setCity(ev.target.value)}/>
                            <input type={"text"} placeholder={"Postal code"}
                            value={postalCode} onChange={ev=>setPostalCode(ev.target.value)}/>
                        </div>

                        <input type={"text"} placeholder={"Country"}
                        value={country} onChange={ev=>setCountry(ev.target.value)}/>
                        <button type={"submit"}>Save</button>
                    </form>
                </div>
            </div>
        </section>
    )
}
