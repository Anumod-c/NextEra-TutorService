import config from "./config";

interface RabbitMQconfig{
    rabbitMQ:{
        url:string;
        queues:{
            tutorQueue:string
        };
    };
}

const RabbitMQconfig:RabbitMQconfig={
    rabbitMQ:{
        url : config.RABBITMQ_URL,
        queues:{
            tutorQueue:'tutor_queue',
        }
    }
}

export default RabbitMQconfig