const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema(
    {
        sender: { type: String, required: true },
        receiver: { type: String, required: true },
        data: { type: String, required: true },
    },
    { timestamps: true }
)

const Message = mongoose.model('message', MessageSchema);

module.exports = Message;