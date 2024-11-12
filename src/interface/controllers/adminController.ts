import { AdminService } from "../../application/use_case/admin";

class AdminController{
    private adminService : AdminService;
    constructor(){
        this.adminService = new AdminService();
    }

    async getTutors(data: {  page: number, limit: number }){
        try{
            const {  page, limit } = data;
            const result  =  await this.adminService.getTutors(page, limit);
            return result
        }catch(error){
            console.log('errror in tutoprlist in admincontroller')
        }
    }
    async getTutorCount(){
        try{
            const result  =  await this.adminService.getTutorCount();
            return result
        }catch(error){
            console.log('errror in tutoprlist in admincontroller')
        }
    }
    async changeTutorStatus(data:{tutorId:string;status:boolean}){
        try{
           const result = await this.adminService.changeTutorStatus(data);
           return result
        }
        catch(error){
            console.log('error in changing status',error);
            
        }
    }
    async changeVerificationStatus(data:{tutorId:string;isVerified:boolean}){
        try {
            console.log('daata from change verification',data)
            const result = await this.adminService.changeVerificationStatus(data);
            return result
        } catch (error) {
            console.log("Erorr in changing verification status",error)
        }
    }
}


export const admincontroller = new AdminController();