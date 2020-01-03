const { getDbConnection } = require("../Utils/dbConnections");
const { handleError, logWriter } = require("../Utils/utilMethods");
const constants = require("../Config/constants");
const validations = require("../Utils/validations");
const urls = require("../Utils/urls");
const keys = require("../Config/keys");
const { generateToken } = require("../Services/passport.service");
const md5 = require('js-md5');

//external imports
const fetch = require("node-fetch");

//internal imports
const fs = require("fs");

exports.updatePassword = async (req, res) => {
    logWriter(`sign_up-i-null-${req.ip_address}-auth-started`);

    if (validations.validatePhoneNumber(req.body.phone_number)) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.auth.invalid_phone_number);
        return;
    }

    let client = getDbConnection();
    try {
        let queryParams = [req.body.phone_number, req.body.email_id];
        let result = await client.query(constants.query.sign_up_check_query, queryParams);
        let rows = result.rows;
        if (rows.length < 0) {
            handleError(constants.response_code.conflict_occured, req, res, constants.error_messages.auth.phone_number_not_found);
            return;
        }
        let password = md5([req.body.password]);
        let queryParams1 = [req.body.username, req.body.email_id, req.body.phone_number/* , req.body.date_of_birth , req.body.gender*/, password, false, new Date];
        result1 = await client.query(constants.query.update_password_query, [req.body.phone_number, password]);
        res.send({ "message_code": "success", "token": generateToken(rows[0].email_id) });
    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.auth.internal_server_error);
        logWriter(`sign_up-e-null-${req.ip_address}-auth-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`sign_up-i-null-${req.ip_address}-auth-finished`);
    }
}

exports.signIn = async (req, res) => {
    logWriter(`sign_in-i-null-${req.ip_address}-auth-started`);
    if (req.body.phone_number && validations.validatePhoneNumber(req.body.phone_number)) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.auth.invalid_phone_number);
        return;
    }
    let client = getDbConnection();
    try {
        let user_name = req.body.user_name;
        let password = md5([req.body.password]);
        let result = await client.query(constants.query.sign_in_query, [user_name, password])
        if (result.rows.length === 0) {
            handleError(constants.response_code.not_found, req, res, constants.error_messages.auth.phone_number_not_found);
            return;
        }
        console.log(result.rows[0].user_id);
        res.send({ "message_code": "success", "token": generateToken(result.rows[0].user_id) });
    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.auth.internal_server_error);
        logWriter(`sign_in-e-null-${req.ip_address}-auth-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`sign_in-i-null-${req.ip_address}-auth-finished`);
    }
}

exports.signUp = async (req, res) => {
    logWriter(`sign_up-i-null-${req.ip_address}-auth-started`);
    if (validateSignup(req, res)) {
        return;
    }
    console.log("here")
    let client = getDbConnection();
    console.log("hop")
    try {
        let queryParams = [req.body.phone_number, req.body.email_id];
        let result = await client.query(constants.query.sign_up_check_query, queryParams);
        console.log(result)
        let rows = result.rows;
        if (rows.length > 0) {
            if (rows[0].email_id == req.body.email_id) {
                handleError(constants.response_code.conflict_occured, req, res, constants.error_messages.auth.email_id_exists);
                return;
            }
            handleError(constants.response_code.conflict_occured, req, res, constants.error_messages.auth.phone_number_exists);
            return;
        }
        let password = md5([req.body.password]);
        let queryParams1 = [req.body.username, req.body.email_id, req.body.phone_number/* , req.body.date_of_birth , req.body.gender*/, password, false, new Date];
        result1 = await client.query(constants.query.sign_up_query, queryParams1);
        let user_result=await client.query(constants.query.getUserId,[req.body.email_id,req.body.phone_number]);
        let user_id=user_result.rows[0].user_id;
        console.log(user_id);
        res.send({ "message_code": "success", "token": generateToken(user_id) });
    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.auth.internal_server_error);
        logWriter(`sign_up-e-null-${req.ip_address}-auth-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`sign_up-i-null-${req.ip_address}-auth-finished`);
    }
}

exports.verifyOtp = async (req, res) => {
    logWriter(`verify_otp-i-null-${req.ip_address}-auth-started`);
    if (validateVerifyOtp(req, res)) {
        return;
    }
    let client = getDbConnection();
    try {
        logWriter(`verify_otp-i-null-${req.ip_address}-auth-verifying with 2factor started`);
        /*
        let request = await fetch(`https://2factor.in/API/V1/${keys.twoFactorApiKey}/SMS/VERIFY/${req.body.Details}/${req.body.otp}`);
        let responseJson = await request.json();
        if (responseJson.Status !== "Success") {
            logWriter(`verify_otp-e-null-${req.ip_address}-auth-otp provider failed to verify otp`);
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.auth.incorrect_otp);
            return;
        }
        */

        logWriter(`verify_otp-i-null-${req.ip_address}-auth-verifying with 2factor finished`);
        if (req.body.otp == 123456 && req.body.Details == 123456789) {
            res.send({ "message_code": "Success", "Details": "OTP Matched" });
        }
        else {
            res.send({ "Status": "Error", "Details": "OTP Mismatch" });
        }
    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.auth.internal_server_error);
        logWriter(`verify_otp-e-null-${req.ip_address}-auth-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`verify_otp-i-null-${req.ip_address}-auth-finished`);
    }
}

exports.requestOtp = async (req, res) => {
    logWriter(`request_otp-i-null-${req.ip_address}-auth-started`);
    /*    if (validations.validatePhoneNumber(req.params.phone_number)) {
        /*
        if (validations.validatePhoneNumber(req.params.phone_number)) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.auth.invalid_phone_number);
            return;
        }
        let request = await fetch(`https://2factor.in/API/V1/${keys.twoFactorApiKey}/SMS/+91${req.params.phone_number || req.body.phone_number}/AUTOGEN`);
        let responseJson = await request.json();
        */
    logWriter(`request_otp-i-null-${req.ip_address}-auth-finished`);
    // return responseJson;*/
    res.send({ "Status": "Success", "Details": "123456789" });

}

const validateSignup = (req, res) => {
    if (validations.validatePhoneNumber(req.body.phone_number)) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.auth.invalid_phone_number);
        return true;
    }
    if (req.body.username == undefined || req.body.username.length < 3) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.auth.invalid_username);
        return true;
    }

    if (validations.validateEmailId(req.body.email_id)) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.auth.invalid_email_id);
        return true;
    }
    /*  if (validations.validateGender(req.body.gender)) {
         handleError(constants.response_code.bad_request, req, res, constants.error_messages.auth.invalid_gender);
         return true;
     } */
    /*  if (validations.validateDob(req.body.date_of_birth)) {
         handleError(constants.response_code.bad_request, req, res, constants.error_messages.auth.invalid_dob);
         return true;
     } */
    return false;
}

const validateVerifyOtp = (req, res) => {
    if (validations.validateOtp(req.body.otp)) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.auth.invalid_otp);
        return true;
    }
    /*  if (validations.validatePhoneNumber(req.body.phone_number)) {
         handleError(constants.response_code.bad_request, req, res, constants.error_messages.auth.invalid_phone_number);
         return true;
     } */
    if (req.body.Details == undefined || req.body.Details == "") {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.auth.invalid_session_id);
        return true;
    }
    return false;
}
