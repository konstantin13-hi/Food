import mongoose from "mongoose";
import {User} from '../models/User'

export async function POST(req) {
    const body = await req.json();
    await mongoose.connect("mongodb+srv://pizza:a65mSRte020sprAN@cluster0.cnoatez.mongodb.net/")
    const createUser = await User.create(body);

    return Response.json(createUser);

}
