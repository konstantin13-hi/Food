
import mongoose from 'mongoose';
import {User} from "../models/User";
import {authOptions} from "../auth/[...nextauth]/route";
import {getServerSession} from "next-auth";

export async function PUT(req, res) {
    mongoose.connect(process.env.MONGODB_URI);
    const data = await req.json();
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    await User.updateOne({email} ,data)


    return Response.json(true);
}

export async function GET(){

    mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    return Response.json(
        await User.findOne({email})
    );
}
