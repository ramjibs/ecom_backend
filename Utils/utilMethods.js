//internal imports
const fs = require("fs");

// custom imports
const constants = require("../Config/constants");
const urls = require("../Utils/urls");

//custom package imports
const fetch = require("node-fetch");





exports.handleError = async (statusCode, req, res, message) => {
    res.status(statusCode);
    res.send({ message });
    let logMessage = `handle_error-w-${req.user ? req.user.user_id : null}-${req.ip_address}-${message}`;
    writeLog(logMessage);
}

const writeLog = async (message) => {
    fs.appendFileSync(constants.log_file_name, `${message}-${new Date().toUTCString()}\n`);
    if (message.split("-")[1] == "e") {
        await sendNotification(message);
    }
}

exports.logWriter = writeLog;

// standards and example for maintaining log writer
// never have a space inbetween unless its a message
// method_name-log_type-user_id-ip_address-controller_name-message-date_time
// example:
//         `get-i-1-123.343.556.09-address-started-${new Date().toUTCString()}`
//         `get-i-null-123.343.556.09-address-started-${new Date().toUTCString()}` if user is not authenticated (user_id is null)