export interface ITutor{
    name: string;
    email:string;
    phone:string;
    password:string;
    profilePicture?: string;
    createdAt?:Date;
}


export interface ITemporaryTutor{
    otp:string;
    tutotData:ITutor;
    created_At?:Date;
}