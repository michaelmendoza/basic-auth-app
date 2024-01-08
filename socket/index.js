const { Server } = require("socket.io");
const Messages = require("../db/messages");

let socket;

/** Create Socket for server */
const createSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (_socket) => {
        console.log('a user connected');

        _socket.on('messages:get', async ({ username }) => {
            const messages = await Messages.findByReciever(username);
            console.log(`Socket: Sending ${messages.length} images to user:${username}`)
            _socket.emit(username, messages);
        })

        _socket.on('messages:create', async ({ sender, receiver, data }) => {
            const message = await Messages.create({ sender, receiver, data });
            console.log(`Socket: Creating message from ${sender} to:${receiver}`)
            _socket.emit(receiver, message)
        })
    });

    io.on('error', function (err) {
        console.log(err);
    });

    socket = io;
}

module.exports = {
    createSocket
}