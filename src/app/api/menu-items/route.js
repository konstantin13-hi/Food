import {MenuItem} from "../models/MenuItem";
import mongoose from "mongoose";

export async function POST(req){
    console.log("req")
    console.log(req.json)
    await mongoose.connect(process.env.MONGODB_URI);
    const data = await req.json();
    const menuItemDoc =  await MenuItem.create(data);
    return Response.json(menuItemDoc);



}

