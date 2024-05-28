"use client"
import {useState} from "react";




export default function RegisterPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(ev){
        ev.preventDefault();
        fetch('/api/register',
            {method: 'POST',
                body:JSON.stringify({email, password}),
            headers:{'Content-type':'application/json'}})

    }
    return(
       <section className={"mt-8"}>
           <h1 className={"text-center text-primary text-4xl"}
               >
               Register Page
           </h1>
           <form className={"block max-w-xs mx-auto"} onSubmit={handleSubmit}>
               <input type="text" placeholder={"email"} value={email}
                      onChange={e=>setEmail(e.target.value)}/>
               <input type="password" placeholder={"password"} value={password}
                      onChange={e=>setPassword(e.target.value)}/>
               <button type="submit">Register</button>
               <button>Login with google</button>
               <div className={"my-4 text-center text-gray-500"}>Login with provider</div>

           </form>
           <button >sdsds</button>


       </section>
    )

}
