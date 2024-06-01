
import mongoose from 'mongoose';
import {User} from "../models/User";
import {authOptions} from "../auth/[...nextauth]/route";
import {getServerSession} from "next-auth";

export async function PUT(req, res) {
    mongoose.connect(process.env.MONGODB_URI);
    const data = await req.json();
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    if('name' in data) {

        await User.updateOne({email: email}, {name: data.name})


    }
    return Response.json(true);
}
