const Message = require("../models/message");

const findByReciever = async (reciever) => {
    try {
        const messages = Message.find({ reciever }).exec();
        return messages;
    }
    catch(error) {
        console.log('Message not found: ', error );
    }

}

module.exports = {
    findByReciever
}