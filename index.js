require('dotenv').config()
const http = require('http');
const { createApp } = require('./app');
const db = require('./db');
const { createSocket } = require('./socket');

// Configurations
const port = process.env.PORT || 3011;

// Set up database
const setupDB = async (app) => {
    await db.initDB();
    await db.dropAllCollections();
    await db.setupMock();
}

// Create express app and listen to port
const app = createApp({ useLogger: true })
const server = http.createServer(app);
setupDB(app);
createSocket(server);

server.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`); })
