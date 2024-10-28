import { Tutor } from "../../../model/Tutor";



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
    async changeVerificationStatus(data:{tutorId:string;isVerified:boolean}){
        try {
            const updatedTutor = await Tutor.findByIdAndUpdate(data.tutorId,{isVerified:data.isVerified},{new:true});
            console.log('updatedtutor',updatedTutor)


            if(!updatedTutor){
                throw new Error("Tutor not found to change verification status")
            }
            return{
                success:true,
                message:`Tutor ${data.isVerified ? 'Verified' : 'Not Verified'} `,
                user: updatedTutor,
            }
        } catch (error) {
            console.log("Erorr in changing verification status",error);
            throw new Error('Error in changing tutor verification status');
        }
    }
}
