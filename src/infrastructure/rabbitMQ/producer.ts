import { Channel } from "amqplib";

export default class Producer{
    constructor(private channel:Channel){}
    
    async produceMessage(data:any,correlationId:string,replyQueue:string){
        try{
            this.channel.sendToQueue(replyQueue,Buffer.from(JSON.stringify(data)),{
                correlationId:correlationId
            })
            console.log('message produced')
        }catch(error){
            console.log("error in producing message back to apigateway")
        }
    }
    
}