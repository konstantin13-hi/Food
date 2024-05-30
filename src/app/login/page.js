'use client'

import {useState} from "react";
import {signIn} from "next-auth/react";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[logInProgress, setLogInProgress] = useState(false);


   async function handleSubmit(ev){
        ev.preventDefault();
       await signIn("credentials",{email:email,password:password,callbackUrl:'/'});
       setLogInProgress(false);

    }
    return(

        <section>


            <h1 className={"flex justify-center text-primary"}>
                Login
            </h1>
            <form className={"max-w-xs mx-auto "} onSubmit={handleSubmit}>
                <input type="text" placeholder={"email"} value={email}
                       disabled={logInProgress}
                       onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder={"password"} value={password}
                       disabled={logInProgress}
                       onChange={e => setPassword(e.target.value)}/>
                <button type="submit"
                        disabled={logInProgress}>Log in</button>
                <button onClick={()=>signIn('google',{callbackUrl:'/'})}>Login with google</button>
                <div className={"my-4 text-center text-gray-500"}>Login with provider</div>


            </form>

        </section>
    )

}
