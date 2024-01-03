const Message = require("../models/message");

const findByReciever = async (reciever) => {
    try {
        const messages = await Message.find({ reciever }).exec();
        const data =  messages.map((message) => message.data);
        return data;
    }
    catch(error) {
        console.log('Message not found: ', error );
    }

}

module.exports = {
    findByReciever
}