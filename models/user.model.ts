import mongoose, { Date, Document, Model } from "mongoose";

export interface UserInterface{
    username:string,
    email:string,
    profilePhoto:string
};

export interface UserDocument extends UserInterface, Document{
    createdAt:Date,
    updatedAt:Date,
}

const userModel = new mongoose.Schema<UserDocument>({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profilePhoto:{
        type:String,
        default:""
    }
},{timestamps:true});

export const User: Model<UserDocument>= mongoose?.models?.User || mongoose.model('User',userModel);