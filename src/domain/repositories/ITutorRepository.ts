import { ITutor } from "../entites/ITutor";

export interface ITutorRepository{
    findByEmail(email:string):Promise<ITutor | null>;
    save(tutor:ITutor):Promise<ITutor>;
    checkTutor(email:string,password:string):Promise<{ success: boolean, message: string, tutorData?: ITutor }>;
    verifyForgotPassOtp(otp:string):Promise<{success:boolean;message:string;forgotPass:boolean}>
    resetTutorPassword(email:string,newPassword:string):Promise<ITutor |null>
    
}