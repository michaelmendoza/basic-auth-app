
/** Returns Request Duration in milliseconds */
const getRequestDuration = start => {
    const NS_PER_SEC = 1e9; // convert to nanoseconds
    const NS_TO_MS = 1e6; // convert to milliseconds
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
  };

const writeLogToFile = (log) => {
    const fs = require('fs');

    fs.appendFile("logs.txt", log + "\n", err => { if (err) { console.log(err); } });
}

const logger = (req, res, next) => {

    let current_datetime = new Date();
    let formatted_date = current_datetime.toLocaleString();
    let method = req.method;
    let url = req.url;
    let status = res.statusCode;
    const start = process.hrtime();
    const duration = getRequestDuration(start);
    let log = `[${formatted_date}] ${method}:${url} ${status} ${duration.toLocaleString()} ms`;

    console.log(log);
    writeLogToFile(log);

    next();
}

module.exports = {
    logger
}