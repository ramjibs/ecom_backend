const constants = require("../Config/constants");
const { getDbConnection } = require("../Utils/dbConnections");
const { logWriter } = require('../Utils/utilMethods');
const validations = require('../Utils/validations');
const { handleError } = require('../Utils/utilMethods');

exports.getAllUser = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-userController-getAllUser-i-started`);
    let client = getDbConnection();
    try {
        if (validations.validateUserId(req.user.user_id)) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.user.invalid_user_id);
            return;
        }
        if (validations.validatePageNumber(parseInt(req.params.page_number))) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.user.invalid_page_number);
            return;
        }
        if (validations.validatePageCount(parseInt(req.params.page_count))) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.user.invalid_page_count);
            return;
        }
        let number = (Number(req.params.page_number) - 1) * req.params.page_count;
        let result = await client.query(constants.query.user.getAllUser,[number,req.params.page_count]);
        if (result.rowCount == 0) {
            handleError(constants.response_code.not_found, req, res, constants.error_messages.user.not_found);
            return;
        }
        
            logWriter(`${req.user.user_id}-${req.ip_address}-userController-getAllUser-i-fetched from db`);
            res.send(result.rows);

    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-userController-getAllUser-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-userController-getAllUser-i-finished`);
    }
    }

    exports.getuserByName = async (req, res) => {
        logWriter(`${req.user.user_id}-${req.ip_address}-userController-getuserByName-i-started`);
        let client = getDbConnection();
        try {
            if (validations.validateUserName(req.user.user_name))
             {
                handleError(constants.response_code.bad_request, req, res, constants.error_messages.user.invalid_user_name);
                return;
            }
            if (validations.validateUserId(req.user.user_id)) {
                handleError(constants.response_code.bad_request, req, res, constants.error_messages.user.invalid_user_id);
                return;
            }
            let result = await client.query(constants.query.user.getuserByName, [req.user.user_id]);
            if (result.rowCount == 0) {
                handleError(constants.response_code.not_found, req, res, constants.error_messages.user.not_found);
                return;
            }
            logWriter(`${req.user.user_id}-${req.ip_address}-userController-getuserByName-i-fetched from db`);
            res.send(result.rows);
        } catch (error) {
            handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
            logWriter(`${req.user.user_id}-${req.ip_address}-userController-getuserByName-e-${error.toString()}`);
        } finally {
            client.end();
            logWriter(`${req.user.user_id}-${req.ip_address}-userController-getuserByName-i-finished`);
        }
    }


    exports.getUser = async (req, res) => {
        logWriter(`${req.user.user_id}-${req.ip_address}-userController-getUser-i-started`);
        let client = getDbConnection();
        try {
            if (validations.validateUserId(req.user.user_id)) {
                handleError(constants.response_code.bad_request, req, res, constants.error_messages.user.invalid_user_id);
                return;
            }
            let result = await client.query(constants.query.user.getUser, [req.user.user_id]);
            if (result.rowCount == 0) {
                handleError(constants.response_code.not_found, req, res, constants.error_messages.user.not_found);
                return;
            }
            logWriter(`${req.user.user_id}-${req.ip_address}-userController-getUser-i-fetched from db`);
            res.send(result.rows);
        } catch (error) {
            handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
            logWriter(`${req.user.user_id}-${req.ip_address}-userController-getUser-e-${error.toString()}`);
        } finally {
            client.end();
            logWriter(`${req.user.user_id}-${req.ip_address}-userController-getUser-i-finished`);
        }
    }


exports.getuserByPhone = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-userController-getuserByPhone-i-started`);
    let client = getDbConnection();
    try {
        if (validations.validateUserId(req.user.user_id)) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.user.invalid_user_id);
            return;
        }
        let result = await client.query(constants.query.user.getuserByPhone, [req.user.user_id]);
        if (result.rowCount == 0) {
            handleError(constants.response_code.not_found, req, res, constants.error_messages.user.not_found);
            return;
        }
        logWriter(`${req.user.user_id}-${req.ip_address}-userController-getuserByPhone-i-fetched from db`);
        res.send(result.rows);
    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-userController-getuserByPhone-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-userController-getuserByPhone-i-finished`);
    }
}