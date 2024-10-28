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
    cv:{
        type:String,
    },
    profilePicture:{
        type:String,
    },
    bio:{
        type:String,
    },
    facebook:{
        type:String,
    },
    twitter:{
        type:String,
    },
    linkedin:{
        type:String,
    },
    instagram:{
        type:String,
    },
    qualifications: [
        {
            qualification: {
                type: String,
            },
            certificate: {
                type: String,
            },
        },
    ],
    expertise: [
        {
            type: String,
        },
    ],  
    created_at:{
        type:Date,
        required:true,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    status:{
        type:Boolean,
        default:true
    }
})


export const Tutor =  mongoose.model<ITutorDocument>('Tutor',tutorSchema);