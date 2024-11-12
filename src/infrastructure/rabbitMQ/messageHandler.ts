import { admincontroller } from "../../interface/controllers/adminController";
import { tutorcontroller } from "../../interface/controllers/tutorController";
import RabbitMQClient from "./client";
export default class MessageHandler {
    static async handle(
        operation: string,
        data: any,
        correlationId: string,
        replyTo: string
    ) {
        let response;
        switch (operation) {
            case "register_tutor":
                console.log("handling operation", operation, data);
                response = await tutorcontroller.registerTutor(data);
                console.log("data reached inside the  message handler", response);
                break;
            case "tutor_register_otp":
                console.log("Handling OPeration", operation, data);
                response = await tutorcontroller.registerOtp(data);
                console.log("data(OTP) reached insidet the message handler", response);
                break;
            case 'tutor_login':
                console.log('loign in handler reached');
                response = await tutorcontroller.tutorLogin(data);
                console.log('response came from tutorLogin  in message handler',response)
                break;
            case 'tutor_forgot_pass':
                console.log('tutorforgotpass in handler reached');
                response = await tutorcontroller.tutorForgotPass(data);
                console.log('response came from tutorforgotpass  in message handler',response)
                break;
            case 'tutor_forgotpass_otp':
                console.log('Handling forgot password OTP operation', operation, data);
                response = await tutorcontroller.forgotPassOtp(data)
                break;
            case 'tutor_reset_pass':
                response = await tutorcontroller.resetPassword(data);
                break;
            case 'tutor_google_login':
                response = await tutorcontroller.googleLogin(data);
                break
            case 'additonalInfo':
                response= await tutorcontroller.additonalInfo(data)
                break;
          
            case 'get_Tutors':
                console.log('reached tutor service for fetching tutors');
                response  = await admincontroller.getTutors(data)
                break;
             case 'get_tutor_count':
                console.log('reached user service for fetching users');
                response  = await admincontroller.getTutorCount()
                break;
            case 'fetchTutorById':
                console.log('reachd fetchTutorById')
                response = await tutorcontroller.getTutorDetails(data);
                console.log('responseeee fetchby tutorid,',response)
                break;
            case 'changeTutorStatus':
                response = await  admincontroller.changeTutorStatus(data)
                break;
            case 'changeVerificationStatus':
                response = await admincontroller.changeVerificationStatus(data);
                break;
            case 'checkTutorBlocked':
                response = await tutorcontroller.checkTutorBlocked(data);
                break;
            case 'editProfile':
                response = await  tutorcontroller.editProfile(data);
                break;    
        }
        await RabbitMQClient.produce(response, correlationId, replyTo);
    }
}
