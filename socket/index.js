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
    });

    socket = io;
}

module.exports = {
    createSocket
}