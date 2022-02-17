const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const logger = require('./middleware/logger');

const createApp = ({ useLogger = false }) => {

    // Create express app
    const app = express()
    
    // Use Middlewares
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    if(useLogger) app.use(logger.logger);
    
    // Setup public routes
    app.use('/', express.static(path.join(__dirname, 'public')));
    
    // Setup api routes
    app.use('/', require('./routes'));

    return app;
}

module.exports = {
    createApp
}