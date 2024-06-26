import NextAuth, {getServerSession} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import mongoose from "mongoose";
import {User} from "../../models/User";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import clientPromise from "../../../../libs/mongoConnect.ts"
import {UserInfo} from "../../models/UserInfo";

export const authOptions = {
    secret: process.env.SECRET,
    // adapter: MongoDBAdapter(clientPromise),

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        CredentialsProvider({

            name: 'Credentials',
            id:'credentials',

            credentials: {
                email: { label: "email", type: "email", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log(credentials)
                const email = credentials?.email;
                const password = credentials?.password;

                console.log(email)
                await mongoose.connect(process.env.MONGODB_URI);
                const user = await User.findOne({ email });
                const passwordMatch = user && await bcrypt.compareSync(password, user.password);
                console.log(passwordMatch);
                if(passwordMatch) {
                    console.log("мы тут тут тут ттут уту тту");
                    console.log(user);
                    return user;

                }

                return null
            }
        })
    ]
}


export async function isAdmin() {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail) {
        return false;
    }
    const userInfo = await UserInfo.findOne({email:userEmail});
    if (!userInfo) {
        return false;
    }
    return userInfo.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
