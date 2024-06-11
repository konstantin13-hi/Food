import {authOptions, isAdmin} from "../auth/[...nextauth]/route";
import {Order} from "../models/Order";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";

export async function GET(req) {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("sdasdasdasdasdsadasdasdadasdsa");
    const session = await getServerSession(authOptions);
    console.log(session);
    const userEmail = session?.user?.email;
    const admin = await isAdmin();


    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    console.log(_id);

    if (_id) {
        return Response.json( await Order.findById(_id) );
    }


    if (admin) {
        return Response.json( await Order.find() );
    }

    if (userEmail) {
        return Response.json( await Order.find({userEmail}) );
    }

}
