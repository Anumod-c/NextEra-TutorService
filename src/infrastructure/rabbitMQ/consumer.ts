import { Channel,ConsumeMessage } from "amqplib";
import RabbitMQconfig from "../config/rabbitMQ";
import MessageHandler from "./messageHandler";
import rabbitMQLogger from "../../../logger/rabbitLogger";
export default class Consumer{
    constructor(private channel:Channel){}

    async consumeMessage(){
        try{
            console.log('ready to consume message from gateway');

            await this.channel.assertQueue(RabbitMQconfig.rabbitMQ.queues.tutorQueue,{durable:true});
            this.channel.consume(RabbitMQconfig.rabbitMQ.queues.tutorQueue,async(message:ConsumeMessage|null)=>{
                if(message){
                    const {correlationId,replyTo} = message.properties;
                    const operation =  message.properties.headers?.function;
                    rabbitMQLogger.emit('messageReceived', {
                        queue: RabbitMQconfig.rabbitMQ.queues.tutorQueue,
                        correlationId,
                        operation,
                    });

                    console.log('Message Propertiees',{correlationId,replyTo,operation});
                    if(message.content){
                        const data = JSON.parse(message.content.toString());
                        try{
                            await MessageHandler.handle(operation,data,correlationId,replyTo)
                            rabbitMQLogger.emit('messageProcessed', { operation, result: "Success" });

                        }catch(error){
                            console.log('Eroor in message handler',error);
                            
                        }
                    }
                    
                }
            },{noAck:true})
            
        }catch(error){
            rabbitMQLogger.emit('error', error);
            console.log('error in consume message in userService',error)
        }
    }
}