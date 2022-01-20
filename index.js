const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');

const app = express()
var port = process.env.PORT || 3011;

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
