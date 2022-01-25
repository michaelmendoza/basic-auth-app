const mongoose = require('mongoose');
const { initMockData } = require('../mock');

const database = 'mock';

const initDB = async () => {
    await mongoose
        .connect('mongodb://127.0.0.1:27017/' + database, { useNewUrlParser: true })
        .then(()=> {
            console.log("Connected to " + database + " database.")
        })
        .catch(e => {
            console.error('Connection error', e.message)
        })

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))

    await initMockData();
    return db;
}

module.exports = { 
    initDB 
}