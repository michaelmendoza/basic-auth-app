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
            console.log(`Socket: ${username}:messages - Sending ${messages.length} messages`)
            _socket.emit(`${username}:messages`, messages);
        })

        _socket.on('messages:create', async ({ sender, receiver, data }) => {
            const message = await Messages.create({ sender, receiver, data });
            console.log(`Socket: ${receiver}:message - Sending new message`)
            _socket.emit(`${receiver}:message`, message)
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