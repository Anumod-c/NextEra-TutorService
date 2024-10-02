import { TutorService } from "../../application/use_case/tutor";

class TutorController{
    private tutorService = new TutorService;

    constructor(){
        this.tutorService = new TutorService();
    }

    async registerTutor(data:any){
        try{
            console.log(data, "register tutor");
            const result = await this.tutorService.registerTutor(data);
            console.log("result of register", result);
            return result;
        } catch (error) {
            console.log("error in register tutor tutorcontroller", error);
        }
    }
    async registerOtp(data: any) {
        try {
            console.log("got inside the register otp", data);
            const result = await this.tutorService.verifyOtp(data);
            return result;
        } catch (error) {
            console.log("reigister otp error in usercontroller-userservice", error);
        }
    }
    async tutorLogin(data: any) {
        try {
            const { email, password } = data;
            console.log("got inside userlogin  in userController");
            const result = await this.tutorService.tutorLogin(email, password);
            return result;
        } catch (error) {
            console.error("Error in Login user controller", error);
        }
    }
    async tutorForgotPass(email: string) {
        try {
            console.log('emaileeeeeee',email)
            const result = await this.tutorService.tutorForgotPass(email);
            console.log("result got from userforgot pass in usercontroller", result);
            return result;
        } catch (error) {
            console.log("Error in userforgotPass", error);
        }
    }
    async forgotPassOtp(data: any) {
        try {
            console.log("Handling forgot password OTP", data);
            const { otp } = data;
            // Implement logic to verify OTP for forgot password
            const result = await this.tutorService.verifyForgotPassOtp(otp);
            return result;
        } catch (error) {
            console.error("Error handling forgot password OTP", error);
            return {
                success: false,
                message: "Error verifying OTP for forgot password",
            };
        }
    }
    async resetPassword(data: any) {
        console.log("Handling reset password ", data);
        const { email, password } = data;
        const result = await this.tutorService.resetPassword(email, password);
        return result
    }
    async googleLogin(data:any){
        console.log('google login reached in controller',data);
        const {credential} =  data;
        const result = await this.tutorService.googleLogin(credential);
        return result
            
    }
    async getTutorDetails(tutorData: { tutorId: string }){
        try {
            const { tutorId } = tutorData;
            console.log('raached gettutor details',tutorId);
            
            const result  = await  this.tutorService.getTutorDetails(tutorId);
            return result
        } catch (error) {
            console.log("Error in tutor fething fot courses",error)
        }
      
    }

}

export const tutorcontroller = new TutorController()