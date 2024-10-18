import { AdminRepository } from "../../domain/repositories/admin/adminRepository";

export class AdminService{
    private adminRepo:AdminRepository;
    constructor(){
        this.adminRepo= new AdminRepository();
    }



    async getTutors(){
        try{
            const result = await this.adminRepo.getTutors();
            return result
        }catch(error){
            console.log('error in tutor in admin.ts')
        }
    }

    async getTutorCount(){
        try{
            const result = await this.adminRepo.getTutorCount();
            return result
        }catch(error){
            console.log('error in tutorcount in admin.ts')
        }
    }
    async changeTutorStatus(data:{tutorId:string;status:boolean;}){
        try{
            const result = await this.adminRepo.changeTutorStatus(data)
            return result
        }catch(error){
            console.log('error in change status in admin.ts',error);           
        }
    }
}