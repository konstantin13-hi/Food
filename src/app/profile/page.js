
'use client';
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import Image from "next/image";
import {useEffect, useState} from "react";


export default function ProfilePage() {
    const session = useSession();
    const  {status} = session;
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [userName, setUserName] = useState('');
    console.log(session);

    useEffect(() => {
        if(status==="authenticated"){
            setUserName(session.data.user.name);
        }

    }, [status]);


    if(status === "loading"){
        return 'Loading ...';
    }

    if(status ==="unauthenticated"){
        return redirect("/login");
    }
   async function handleProfileInfo(ev){
        ev.preventDefault();
        setSaved(false);
        setIsSaving(true);
   const response =  await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({name:userName}),
        })
       setIsSaving(false);
       if(response.ok){
           setSaved(true);


       }

    }
    async function handleFileChange(ev){
        const file = ev.target.files[0];
        if(file.size > 0){
            const data = new FormData();
            data.set('file', file);
            await fetch('/api/upload', {
                method: 'POST',
                body:data,
                   })
        }
    }

    const userImage = session.data.user.image;
    return (
        <section>
            <h1 className={"flex justify-center text-primary"}>
                profile
            </h1>
            <div className={"max-w-xs mx-auto "}>
                {saved && (
                    <h2 className={"text-center bg-green-100 p-4 rounded-lg border-4 text-4xl" +
                        "border-green-300"}>
                        Profile saved!
                    </h2>)}

                {isSaving && (
                    <h2 className={"text-center bg-blue-100 p-4 rounded-lg border-4 text-4xl border-blue-300"}>
                       Saving!
                    </h2>)}


                <div className={"flex gap-2"}>


                    <div className="flex justify-center">
                    <div className={"bg-gray-300 p-4 rounded-lg"}>
                            <Image className={"rounded-lg"} src={userImage} width={64} height={64}
                                   alt={'avatar'}></Image>
                        <label>
                            <input type={"file"} className={"hidden"} onChange={handleFileChange}/>
                            <span className={"block border rounded-lg text-center cursor-pointer"}>Edit</span>
                        </label>
                            <button type={"button"}>Change avatar</button>
                        </div>
                    </div>
                    <form className={"grow"} onSubmit={handleProfileInfo}>

                        <input type={"text"} placeholder={"First Name"} value={userName}
                               onChange={ev => setUserName(ev.target.value)}/>
                        <input type={"email"} disabled={true} placeholder={session?.data?.user?.email}/>
                        <button type={"submit"}>Save</button>
                    </form>
                </div>
            </div>
        </section>
    )
}
