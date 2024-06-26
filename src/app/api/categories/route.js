import {Category} from "../models/Category";
import mongoose from "mongoose";


export async function POST(req){
    const {name} = await req.json();
   const categoryDoc = await Category.create({name});
   return Response.json(categoryDoc)

}

export async function PUT(req){
    const{_id,name} = await req.json();
    mongoose.connect(process.env.MONGODB_URI);
    await Category.updateOne({_id},{name});
    return Response.json(true);
}

export async function GET(){
    mongoose.connect(process.env.MONGODB_URI);
    const result = await Category.find();
    return Response.json(result);
}

export async function DELETE(req){
    mongoose.connect(process.env.MONGODB_URI);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    await Category.deleteOne({_id});
    return Response.json(true);
}
