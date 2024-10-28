export interface ITutor{
   
    name: string;
    email:string;
    phone:string;
    password:string;
    bio?:string;
    instagram?:string,
    linkedin?:string,
    twitter?:string,
    facebook?:string,
    cv?:string;
    qualifications?:qualifications[]
    expertise?:string[];


    profilePicture?: string;
    createdAt?:Date;
}


export interface ITemporaryTutor{
    otp:string;
    tutotData:ITutor;
    created_At?:Date;
}

interface qualifications{
    qualification:string;
    certificate:string;
}

