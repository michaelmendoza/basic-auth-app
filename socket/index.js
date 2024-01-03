const { Server } = require("socket.io");
const { findByReciever } = require("../db/messages");

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
            const messages = await findByReciever(username);
            console.log(`Socket: Sending ${messages.length} images to user:${username}`)
            _socket.emit(username, messages);
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