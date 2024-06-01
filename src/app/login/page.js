'use client'

import {useState} from "react";
import {signIn} from "next-auth/react";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setLoginInProgress(true);

        await signIn('credentials', {email, password, callbackUrl: '/'});

        setLoginInProgress(false);
    }

    return(

        <section>


            <h1 className={"flex justify-center text-primary"}>
                Login
            </h1>
            <form className={"max-w-xs mx-auto "} onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="email" value={email}
                       disabled={loginInProgress}
                       onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" name="password" placeholder="password" value={password}
                       disabled={loginInProgress}
                       onChange={ev => setPassword(ev.target.value)}/>
                <button disabled={loginInProgress} type="submit">Login</button>
                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>
                <button type={"button"} onClick={() => signIn('google', {callbackUrl: '/'})}>Login with google</button>
                <div className={"my-4 text-center text-gray-500"}>Login with provider</div>


            </form>

        </section>
    )

}