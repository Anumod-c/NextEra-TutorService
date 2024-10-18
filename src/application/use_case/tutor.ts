import { ITutor } from "../../domain/entites/ITutor";
import { TutorRepository } from "../../domain/repositories/TutorRepository";
import { generateOtp } from "../../utils/generateOtp";
import config from "../../infrastructure/config/config";
import { TemporaryTutor } from "../../model/Temptutor";
import { OAuth2Client } from "google-auth-library";



export class TutorService {
    private tutorRepo: TutorRepository;
    constructor() {
        this.tutorRepo = new TutorRepository();
    }



    async registerTutor(tutorData: ITutor): Promise<any> {
        try {
            console.log('reached tutor.ts in usecase');
            const existingTutor = await this.tutorRepo.findByEmail(tutorData.email);
            console.log('tutor found', existingTutor);
            if (existingTutor) {
                return { success: false, message: "Email already registered" }
            } else {
                const otp = generateOtp();
                const forgotPass: boolean = false;
                console.log('generated otp', otp);
                console.log('tutor data', tutorData);
                const temporaryTutor = new TemporaryTutor({
                    otp: otp,
                    tutorData: tutorData
                });
                await temporaryTutor.save();
                return { message: "Verify the otp to complete registeration", forgotPass, success: true, otp, tutorData }
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error saving user:${error.message}`)
            }
            throw error
        }

    }


    async verifyOtp(otpObject: { otp: string }): Promise<any> {
        try {
            const otp = otpObject.otp;
            console.log('Verifying OTP', otp);
            const temporaryTutor = await TemporaryTutor.findOne({ otp });
            if (!temporaryTutor) {
                return { success: false, message: "Invalid OTP" };
            } console.log('temporaryUser', temporaryTutor);

            const tutorData = temporaryTutor.tutorData;
            if (!tutorData) {
                return { success: false, message: "User data is missing in the temporary record" };
            }
            const savedTutor = await this.tutorRepo.save(tutorData);
            await TemporaryTutor.deleteOne({ otp });
            return {
                message: "tutor data saved successfully",
                success: true,
                tutor_data: savedTutor
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error saving user:${error.message}`)
            }

        }
    }


    async tutorLogin(email: string, passord: string): Promise<any> {
        try {
            const result = await this.tutorRepo.checkTutor(email, passord);
            return result
        } catch (error) {
            console.log('Error in useLogin in userCase');
        }
    }

    async tutorForgotPass(email: string): Promise<any> {
        try {
            console.log(email, 'EMAIL');
            const tutor = await this.tutorRepo.findByEmail(email);
            if (tutor) {
                const forgotPass: boolean = true;

                const otp = generateOtp();
                console.log(otp, 'otp');
                const tempData = new TemporaryTutor({
                    otp: otp,
                    email: email,
                    createdAt: new Date()
                })
                await tempData.save()
                return { forgotPass, tutor: { email: tutor.email, name: tutor.name }, otp, success: true, message: "Found tutor with this email" }
            } else {
                return { success: false, message: "No tutor found with this email" };
            }
        } catch (error) {
            console.log('error in usecase for forgotpass', error)
        }

    }

    async verifyForgotPassOtp(otp: string): Promise<any> {
        try {
            // Implement OTP verification logic for forgot password
            console.log('Verifying forgot password OTP', { otp });
            // Example logic
            const result = await this.tutorRepo.verifyForgotPassOtp(otp);
            return result;
        } catch (error) {
            console.error('Error verifying forgot password OTP:', error);
            return { success: false, message: 'Error verifying OTP' };
        }
    }
    async resetPassword(email: string, passord: string): Promise<any> {
        try {
            const tutor = await this.tutorRepo.resetTutorPassword(email, passord);
            if (tutor) {
                return {
                    success: true,
                    message: "Password reset successfully",
                    tutor: { email: tutor.email, name: tutor.name }, // Optional: Basic user info
                    // token: token // Optional: New authentication token
                };
            } else {
                return { success: false, message: "Tutor not found" };
            }
        } catch (error) {
            const err = error as Error;
            throw new Error(`Password reset failed: ${err.message}`);
        }
    }

    async googleLogin(credential: string): Promise<any> {
        try {
            const client = new OAuth2Client(config.googleClientId);
            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: config.googleClientId,
            });
            const payload = ticket.getPayload();
            if (!payload) {
                return { success: false, message: "Invalid Google token" };
            }
            const email = payload.email;
            // Check if email is undefined
            if (!email) {
                return { success: false, message: "Google account does not have an email address" };
            }

            let tutor = await this.tutorRepo.findByEmail(email);
            if (tutor) {
                return { success: true, message: "Google login successful", tutor };
            } else {
                // Optionally, you could create a new user here
                return { success: false, message: "Google login failed", tutor };
            }
        } catch (error) {
            const err = error as Error;
            throw new Error(`Google  login failed: ${err.message}`);
        }
    }
    async getTutorDetails(tutorId: string): Promise<any> {
        try {
            const result = await this.tutorRepo.getTutorDetails(tutorId);
            return result;
        } catch (error) {
            const err = error as Error;
            throw new Error(`getTutorDetails : ${err.message}`);
        }
    }
    async checkTutorBlocked(tutorId:string){
        try{
            const result = await this.tutorRepo.checkTutorBlocked(tutorId);
            return result
        }catch(error){
            console.log("Error in isblocked middleware",error)
        }
    }
}