import { AdminService } from "../../application/use_case/admin";

class AdminController{
    private adminService : AdminService;
    constructor(){
        this.adminService = new AdminService();
    }

    async getTutors(){
        try{
            const result  =  await this.adminService.getTutors();
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
}


export const admincontroller = new AdminController();