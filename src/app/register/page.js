export default function RegisterPage(){
    return(
       <section className={"mt-8"}>
           <h1 className={"text-center text-primary text-4xl"}
               >
               Register Page
           </h1>
           <for className={"block max-w-xs mx-auto"}>
               <input type="text" placeholder={"email"}/>
               <input type="password" placeholder={"password"}/>
               <button type="submit">Register</button>
               <button>Login with google</button>
               <div className={"my-4 text-center text-gray-500"}>Login with provider</div>

           </for>


       </section>
    )

}
