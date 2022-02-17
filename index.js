require('dotenv').config()
const { createApp } = require('./app');
const db = require('./db');

// Configurations
const port = process.env.PORT || 3011;

// Set up database
db.initDB().then(db.setupMock())

// Create express app and listen to port
const app = createApp({ useLogger: true })
app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`); })
