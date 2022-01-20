const mongoose = require('mongoose')

const database = 'mock';

mongoose
    .connect('mongodb://127.0.0.1:27017/' + database, { useNewUrlParser: true })
    .then(()=> {
        console.log("We are connected to " + database + " database.")
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

module.exports = db