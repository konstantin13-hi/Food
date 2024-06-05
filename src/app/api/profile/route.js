
import mongoose from 'mongoose';
import {User} from "../models/User";
import {authOptions} from "../auth/[...nextauth]/route";
import {getServerSession} from "next-auth";
import {UserInfo} from "../models/UserInfo";

export async function PUT(req, res) {
    mongoose.connect(process.env.MONGODB_URI);

    const data = await req.json();
    const {name,image,...otherData} = data;
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    console.log(data)
    await User.updateOne({email} ,{name,image})
    await UserInfo.findOneAndUpdate({email:email}, otherData, {upsert:true});


    return Response.json(true);
}

export async function GET(){

    mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
      if(!email){
          return Response.json({});
      }
      const user = await User.findOne({email}).lean();
      const userInfo = await UserInfo.findOne({email}).lean();
    return Response.json({...user,...userInfo});
}
