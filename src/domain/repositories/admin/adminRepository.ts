import { Tutor } from "../../../model/Tutor";

import { ITutor } from "../../entites/ITutor";


export class AdminRepository {




    async getTutors(){
        try{
            const tutorData = await Tutor.find({}).sort({_id:-1})
            console.log('tutorrcount',tutorData);

            return tutorData
        }catch(error){
            const err = error as Error;
            console.log("Error tutor get count admin :", err);
            throw new Error(`error tutor get count admin :${err.message}`);   
        }
    }
    async getTutorCount(){
        try{
            const tutorCount = await Tutor.countDocuments()
            console.log('tutorrcount',tutorCount);

            return tutorCount
        }catch(error){
            const err = error as Error;
            console.log("Error tutor get count admin :", err);
            throw new Error(`error tutor get count admin :${err.message}`);   
        }
    }
    async changeTutorStatus(data:{tutorId:string,status:boolean}){
        try{
            console.log('reached tutro for chaning status')
            const updatedTutor = await Tutor.findByIdAndUpdate(data.tutorId,{status:data.status},{new:true});

            if(!updatedTutor){
                throw new Error("Tutor not found to change status")
            }
            return{
                success:true,
                message:`Tutor ${data.status ? 'unblocked' : 'blocked'} successfully`,
                user: updatedTutor,
            }
        }catch(error){
              console.error('Error in Admin Repo (changeStatus):', error);
            throw new Error('Error in changing tutor status');
            
        }
    }
}
