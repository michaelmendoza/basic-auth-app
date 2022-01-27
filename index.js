require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { initDB } = require('./db');
const logger = require('./middleware/logger');

const app = express()
var port = process.env.PORT || 3011;

// Initialize db 
initDB();

// Use Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger.logger);

// Setup public routes
app.use('/', express.static(path.join(__dirname, 'public')));

// Setup api routes
app.use('/', require('./routes'));

app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`); })
