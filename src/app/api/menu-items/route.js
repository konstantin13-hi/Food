import {MenuItem} from "../models/MenuItem";
import mongoose from "mongoose";


export async function POST(req){
    console.log("req")
    console.log(req.json)
    await mongoose.connect(process.env.MONGODB_URI);
    const data = await req.json();
    // console.log("POST");
    // console.log(data);
    const menuItemDoc =  await MenuItem.create(data);
    return Response.json(menuItemDoc);

}

export async function PUT(req){
    mongoose.connect(process.env.MONGODB_URI);
    const {_id, ...data} = await req.json();
    await MenuItem.findByIdAndUpdate({_id},data);


    return Response.json(true);
}


export async function GET(){
   mongoose.connect(process.env.MONGODB_URI);
    return Response.json(await MenuItem.find());
}

export async function DELETE(req){
    mongoose.connect(process.env.MONGODB_URI);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    await MenuItem.deleteOne({_id});
    return Response.json(true);
}


