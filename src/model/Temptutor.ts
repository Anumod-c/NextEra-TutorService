import mongoose,{Document,Schema} from "mongoose";

import { ITutor } from "../domain/entites/ITutor";


export interface ITemporaryTutor extends Document{
    otp:string;
    tutorData:ITutor;
    cretedAt:Date;
}

const TemporaryTutorSchema:Schema = new Schema({
    otp: { type: String, required: true },
    tutorData: { type: Object as any, required: false }, // You can leave this as Object since the interface above handles typing
    createdAt: { type: Date, default: Date.now, expires: 900 }, // Expires after 15 minutes (900 seconds)
});

export const TemporaryTutor = mongoose.model<ITemporaryTutor>('TemporaryTutor',TemporaryTutorSchema);