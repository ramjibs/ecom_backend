const { getDbConnection } = require("../Utils/dbConnections");
const { handleError, logWriter } = require("../Utils/utilMethods");
const constants = require("../Config/constants");
const validations = require("../Utils/validations");

//internal imports
const fs = require("fs");

exports.add = async (req, res) => {
    logWriter(`add-i-${req.user.user_id}-${req.ip_address}-address-started`);
    if (validateAddress(req, res)) {
        return;
    }
    let client = getDbConnection();
    try {
        await client.query(constants.query.address.add, [req.user.user_id, req.body.title, req.body.line_1, req.body.line_2, req.body.city, req.body.state, req.body.landmark, req.body.pincode,req.body.longitude,req.body.latitude,req.body.address_type]);
        res.send({'message_code':'Success'});
    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.internal_server_error);
        logWriter(`add-e-${req.user.user_id}-${req.ip_address}-address-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`add-i-${req.user.user_id}-${req.ip_address}-address-finally`);
    }
}

exports.update = async (req, res) => {
    logWriter(`update-i-${req.user.user_id}-${req.ip_address}-address-started`);
    if (validateAddress(req, res)) {
        return;
    }
    let client = getDbConnection();
    try {
        let { rowCount } = await client.query(constants.query.address.update, [req.user.user_id, req.body.id, req.body.title, req.body.line_1, req.body.line_2, req.body.city, req.body.state, req.body.landmark, req.body.pincode,req.body.longitude,req.body.latitude,req.body.address_type]);
        if (!rowCount) {
            handleError(constants.response_code.not_found, req, res, constants.error_messages.address.address_not_found);
            return;
        }
        res.end();
    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.internal_server_error);
        logWriter(`update-e-${req.user.user_id}-${req.ip_address}-address-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`update-i-${req.user.user_id}-${req.ip_address}-address-finally`);
    }
}

// get all address for particular user_id
exports.get = async (req, res) => {
    logWriter(`get-i-${req.user.user_id}-${req.ip_address}-address-started`);
    let client = getDbConnection();
    try {
        let queryParams = [req.user.user_id];
        let { rows } = await client.query(constants.query.address.get, queryParams);
        let addressess = rows.map(r => {
            delete r.user_id;
            return r;
        });
        res.send(addressess);
    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.internal_server_error);
        logWriter(`get-e-${req.user.user_id}-${req.ip_address}-address-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`get-i-${req.user.user_id}-${req.ip_address}-address-finally`);
    }
}

//delete one address, last one address can't be deleted
exports.delete = async (req, res) => {
    logWriter(`delete-i-${req.user.user_id}-${req.ip_address}-address-started`);
    if (!req.params.id || !Number(req.params.id) || Number(req.params.id) <= 0) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.address.invalid_address_id);
        return;
    }
    let client = getDbConnection();
    try {
        let { rowCount } = await client.query(constants.query.address.delete, [req.user.user_id, req.params.id]);
        if (!rowCount) {
            handleError(constants.response_code.not_found, req, res, constants.error_messages.address.address_not_found);
            return;
        }
        res.end();
    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.internal_server_error);
        logWriter(`delete-e-${req.user.user_id}-${req.ip_address}-address-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`delete-i-${req.user.user_id}-${req.ip_address}-address-finally`);
    }
}

exports.setPrimary = async (req, res) => {
    logWriter(`set_primary-i-${req.user.user_id}-${req.ip_address}-address-started`);
    if (!req.params.id || !Number(req.params.id) || Number(req.params.id) <= 0) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.address.invalid_address_id);
        return;
    }
    let client = getDbConnection();
    try {
        let queryParams = [req.user.user_id, req.params.id];
        let { rowCount } = await client.query(constants.query.address.set_primary, queryParams);
        if (!rowCount) {
            handleError(constants.response_code.not_found, req, res, constants.error_messages.address.address_not_found);
            return;
        }
        await client.query(constants.query.address.remove_primary, queryParams);
        res.end();
    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.internal_server_error);
        logWriter(`set_primary-e-${req.user.user_id}-${req.ip_address}-address-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`set_primary-i-${req.user.user_id}-${req.ip_address}-address-finally`);
    }
}

const validateAddress = (req, res) => {
    if (!req.body.title || req.body.title.length < 2) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.address.invalid_title);
        return true;
    }
    if (!req.body.line_1 || req.body.line_1.length < 10) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.address.invalid_line_1);
        return true;
    }
    if (!req.body.line_2 || req.body.line_2.length < 10) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.address.invalid_line_2);
        return true;
    }
    if (!req.body.city || req.body.city.length < 2) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.address.invalid_city);
        return true;
    }
    if (!req.body.state || req.body.state.length < 2) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.address.invalid_state);
        return true;
    }
    if (!req.body.pincode || !Number(req.body.pincode) || (req.body.pincode < 100000 || req.body.pincode > 999999)) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.address.invalid_pincode);
        return true;
    }
    return false;
}
