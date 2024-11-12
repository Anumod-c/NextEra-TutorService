import { Channel } from "amqplib";
import rabbitMQLogger from "../../../logger/rabbitLogger";
export default class Producer{
    constructor(private channel:Channel){}
    
    async produceMessage(data:any,correlationId:string,replyQueue:string){
        try{
            this.channel.sendToQueue(replyQueue,Buffer.from(JSON.stringify(data)),{
                correlationId:correlationId
            })
            rabbitMQLogger.emit('messageProduced', { queue: replyQueue, correlationId });

            console.log('message produced')
        }catch(error){
            rabbitMQLogger.emit('error', error);

            console.log("error in producing message back to apigateway",error)
        }
    }
    
}