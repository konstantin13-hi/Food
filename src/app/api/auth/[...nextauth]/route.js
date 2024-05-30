import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import mongoose from "mongoose";
import {User} from "../../models/User";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    secret: process.env.NEXT_AUTH_SECRET,

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        CredentialsProvider({

            name: 'Credentials',
            id:'credentials',

            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
               const email = credentials?.email;
               const password = credentials?.password;
               console.log(credentials)
                console.log(email)
               await mongoose.connect(process.env.MONGODB_URI);
               const user = await User.findOne({ email });
               const passwordMatch = user && await bcrypt.compareSync(password, user.password);
               console.log(passwordMatch);
               if(passwordMatch) {
                   return user;
               }
                return null
            }
        })
    ]
})

export { handler as GET, handler as POST }
