import { ITutorRepository } from "./ITutorRepository";
import { ITutor } from "../entites/ITutor";
import config from "../../infrastructure/config/config";
import bcrypt from 'bcryptjs'

import { Tutor } from "../../model/Tutor";

import { TemporaryTutor } from "../../model/Temptutor";



export class TutorRepository implements ITutorRepository{
    async findByEmail(email:string): Promise<ITutor | null> {
        try{
            console.log('reachd userRepository findByEmail',email);

            const tutor = await Tutor.findOne({ email: email }).exec();
            console.log(tutor,'tutor');
                
                return tutor
            } catch (error) {
                const err = error as Error;
                throw new Error(`Error finding tutor by email: ${err.message}`);
            }
    }

    async save(tutor:ITutor):Promise<ITutor>{
        try{
            console.log('save user in userrepository reached');
            const hashedPassword = await bcrypt.hash(tutor.password, 10);
            console.log('hashed password', hashedPassword);
            const tutorData = { ...tutor, password: hashedPassword };

            console.log('final user data', tutorData)
            const newTutor = new Tutor(tutorData);
            await newTutor.save();
            console.log('new user saved!');
            return newTutor
        }catch(error){
            const err = error as Error;
            console.error("Error saving tutor ", err);
            throw new Error(`Error saving tutor:${err.message}`)
        }
    }


    async checkTutor(email: string, password: string): Promise<{ success: boolean; message: string; tutorData?: ITutor; }> {
        const tutorData = await Tutor.findOne({ email: email });
        if (!tutorData) {
            return { success: false, message: "Email incorrect" };
        }
        const isPasswordMatch = await bcrypt.compare(password, tutorData.password);
        if (!isPasswordMatch) {
            console.log(" passord is incorrrect")
            return { success: false, message: "Incorrect passoword" }
        } else {
            console.log("Incorrect passsword for existing tutor")
            return { success: true, message: "Login successfull",tutorData };
        }
    }


    async verifyForgotPassOtp(otp: string): Promise<{ success: boolean; message: string; forgotPass: boolean; }> {
        try{
            const otpEntry = await TemporaryTutor.findOne({otp}).exec();
            console.log('llllllllllllllllllll', otpEntry)
            if (!otpEntry) {
                return { success: false, message: 'Invalid OTP', forgotPass: true };
            }
            console.log('OTP verified successfully');
            return { success: true, message: 'OTP verified successfully', forgotPass: true }
        } catch (error) {
            const err = error as Error;
            console.error('Error verifying forgot password OTP', err);
            return { success: false, forgotPass: true, message: `Error verifying OTP: ${err.message}` };
        }
    }

    async resetTutorPassword(email: string, newPassword: string): Promise<ITutor | null> {
        try{
            const  tutor = await Tutor.findOne({email}).exec();
            if(!tutor){
                return null;
            }
            const hashedPassword = await bcrypt.hash(newPassword,10);
            tutor.password = hashedPassword;
            await tutor.save();
            return tutor
        } catch (error) {
            const err = error as Error;
            throw new Error(`Error resetting user password: ${err.message}`);
        }
    }
    async getTutorDetails(tutorId:string){
        try {
            const tutorDetails = await Tutor.findOne({_id:tutorId});
            console.log('tutorDetails',tutorDetails)
            if(tutorDetails){
               
                return {tutorDetails:tutorDetails,success:true,message:"Fetched tutor details"}
            }else{
                return {name:null,success:false,message:"Error fetching tutor details"}
            }
        } catch (error) {
            console.log('Error in fetching tutordetails',error);
            
        }
    }
    async checkTutorBlocked(tutorId:string){
        try {
            const tutor = await Tutor.findOne({ _id: tutorId }); // Use await to resolve the promise
            if (!tutor) {
                return { success: false, message: 'No tutor with this tutorId' };
            }
            // Assume that the user has a 'status' field that indicates if the user is blocked
            return { success: true, message: "Tutor found", tutor }; 
        } catch (error) {
            console.log("Error in fetching user with tutor id", error);
            return { success: false, message: 'Internal server error' }; // Handle errors gracefully
        }
    }
    async additonalInfo(tutorData:any){
        try {
            console.log('tutorData',tutorData)
            const tutorId = tutorData.tutorId
            const updateData ={
                bio:tutorData.bio,
                expertise: tutorData.expertise,
                qualifications: tutorData.qualifications,
                profilePicture: tutorData.profilePicture,
                cv: tutorData.cv
            }
            const result = await Tutor.findByIdAndUpdate(
                tutorId,
                { $set: updateData },
                { new: true, runValidators: true }
            );
            console.log('resulteeee',result)
            return {success:true,message:"data saved successfully",result}
        } catch (error) {
            console.log('Error in saving additional info in tutor.ts', error);
            throw error;        }
    }
   async editProfile(tutorData:any){
    try {
        console.log('tutor datareached for edit in  tutor reppo',tutorData)
        const tutorId = tutorData.id;
        const updateData ={
            name:tutorData.name,
            phone:tutorData.phone,
            bio:tutorData.bio,
            expertise: tutorData.expertise,
            qualifications: tutorData.qualifications,
            profilePicture: tutorData.profilePicture,
            cv: tutorData.cv,
            instagram:tutorData.instagram,
            linkedin:tutorData.linkedin,
            twitter:tutorData.twitter,
            facebook:tutorData.facebook,
        }
        const result = await Tutor.findByIdAndUpdate(
            tutorId,
            { $set: updateData },
            { new: true, runValidators: true }
        );
        console.log(',result after editing',result)
        return {success:true,message:"data saved successfully",result}

    } catch (error) {
        console.log('Error in  editing profile in tutorReopsitory', error);
        throw error;
        }

    }
   
}