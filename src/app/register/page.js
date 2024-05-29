"use client"
import {useState} from "react";
import Link from "next/link";
import {error} from "next/dist/build/output/log";




export default function RegisterPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(true);
    const [error, setError] = useState(false);

   async function handleSubmit(ev){
       ev.preventDefault();
       setCreatingUser(true)
       setError(false)
       setUserCreated(false)

      const response = await fetch('/api/register',
               {
                   method: 'POST',
                   body: JSON.stringify({email, password}),
                   headers: {'Content-type': 'application/json'}
               })


       if(response.ok){
           setUserCreated(true);
       }
       else {
           setError(true);
       }
       setCreatingUser(false);

    }
    return(
       <section className={"mt-8"}>
           <h1 className={"text-center text-primary text-4xl"}
               >
               Register Page
           </h1>
           {userCreated && (
               <div className="flex justify-center">
                   User Created &nbsp;
                   <Link className={"underline"} href="/login"> Log in </Link>
               </div>
           )}
           {error && (
               <div className="flex justify-center">
                   Error &nbsp;

               </div>
           )}
           <form className={"block max-w-xs mx-auto"} onSubmit={handleSubmit}>
               <input type="text" placeholder={"email"} value={email}
                      disabled={creatingUser}
                      onChange={e=>setEmail(e.target.value)}/>
               <input type="password" placeholder={"password"} value={password}
                      disabled={creatingUser}
                      onChange={e=>setPassword(e.target.value)}/>
               <button type="submit">Register</button>
               <button>Login with google</button>
               <div className={"my-4 text-center text-gray-500"}>Login with provider</div>

           </form>
           <div className="flex justify-center">
               Existing account? &nbsp; <Link className={"underline"} href="/login">Log in</Link>
           </div>



       </section>
    )

}
