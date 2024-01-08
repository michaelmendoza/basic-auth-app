const Message = require("../models/message");

const findByReciever = async (receiver) => {
    try {
        const filter = { receiver };
        const messages = await Message.find(filter).exec();
        const data =  messages.map((message) => { return { sender:message.sender, data:message.data } });
        return data;
    }
    catch(error) {
        console.log('Message not found: ', error );
    }
}

const create = async ({ sender, receiver, data }) => {
    try {
        const message = new Message({ sender, receiver, data });
        message.save();
        return { sender:message.sender, data:message.data };
    }
    catch(error) {
        console.log('Unable to create message not found: ', error );
    }
}

module.exports = {
    findByReciever,
    create
}