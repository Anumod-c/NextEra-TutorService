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
            const tutorCount = await Tutor.find({}).countDocuments();
            console.log('tutorrcount',tutorCount);

            return tutorCount
        }catch(error){
            const err = error as Error;
            console.log("Error tutor get count admin :", err);
            throw new Error(`error tutor get count admin :${err.message}`);   
        }
    }
}