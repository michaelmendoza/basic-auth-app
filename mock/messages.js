const Message = require("../models/message");

const createDataURL = async () => {
    const url = "https://images-prod.dazeddigital.com/480/azure/dazed-prod/1280/9/1289615.jpg";
    const response = await fetch(url);
    const blob = await response.blob();
    const buffer = Buffer.from(await blob.text());
    const dataURL = "data:" + blob.type + ';base64,' + buffer.toString('base64');
    return dataURL;
}

const createMockMessage = async ({sender, receiver}) => {
    try {
        const data = await createDataURL();
        const message = new Message({ sender, receiver, data });
        await message.save();
        return message;
    }
    catch(error) {
        console.log('Message not created: ', error );
    }
}

module.exports = {
    createMockMessage
}
