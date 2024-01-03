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
            const json = JSON.stringify(messages);
            console.log(json);
            io.emit(username, json);
        })
    });

    socket = io;
}

module.exports = {
    createSocket
}