const keys = require("../Config/keys");

module.exports = {
    send_otp: "https://2factor.in/API/V1/%s/SMS/+91%s/AUTOGEN",
    verify_otp: "https://2factor.in/API/V1/%s/SMS/VERIFY/%s/%s",
    error_notification: `https://hooks.slack.com/services/${keys.slack_notification}`
}