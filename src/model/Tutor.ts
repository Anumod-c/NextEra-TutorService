import mongoose,{Document,Schema} from "mongoose";

import { ITutor } from "../domain/entites/ITutor";

export interface ITutorDocument extends ITutor,Document{}

const tutorSchema :Schema = new Schema({
    name:{
        type:String,
        required:true,
    },email:{
        type: String,
        required:true,
        unique:true
    },
    phone:{
        type: Number,
    },
    password:{
        type: String,
        required: true
    },
    created_at:{
        type:Date,
        required:true,
        default:Date.now
    }
})


export const Tutor =  mongoose.model<ITutorDocument>('Tutor',tutorSchema);