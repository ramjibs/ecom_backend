const constants = require("../Config/constants");
const { getDbConnection } = require("../Utils/dbConnections");
const { logWriter } = require('../Utils/utilMethods');
const validations = require('../Utils/validations');
const { handleError } = require('../Utils/utilMethods');
//const { transactionLog } = require('../utils/utilMethods');

exports.addWallet = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-addWallet-i-started`);
    let client = getDbConnection();
    try {
        if (validateWallet(req, res)) {
            return;
        }
        let result = await client.query(constants.query.wallet.checkWallet, [req.user.user_id,req.body.product_id]);
        if (result.rowCount == 0) {
            if (req.body.quantity < 0) {
                handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.quantity_check);
                return;
            }
        }
        else {
            if ((parseInt(result.rows[0].quantity) + req.body.quantity) < 0) {
                handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.quantity_check);
                return;
            }
        }
        await client.query(constants.query.wallet.addWallet, [req.user.user_id,req.body.product_id,req.body.quantity, req.body]);
        logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-addWallet-i-added`);
        res.send({'message_code':'Success'});
        res.end();
        
        // transactionLog(`${req.user.user_id}-addWallet-i-${req.body.quantity}`);

    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-addWallet-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-addWallet-i-finished`);
    }
}

exports.getUserTransaction = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getUserTransaction-i-started`);
    let client = getDbConnection();
    try {
        if (validations.validateUserId(req.user.user_id)) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_user_id);
            return;
        }
        if (validations.validatePageNumber(parseInt(req.params.page_number))) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_page_number);
            return;
        }
        if (validations.validatePageCount(parseInt(req.params.page_count))) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_page_count);
            return;
        }
        else {
            let number = (Number(req.params.page_number) - 1) * req.params.page_count;
            let result = await client.query(constants.query.wallet.getUserTransaction, [req.user.user_id,number,req.params.page_count]);
            if (result.rowCount == 0) {
                handleError(constants.response_code.not_found, req, res, constants.error_messages.wallet.not_found);
                return;
            }
                res.send(result.rows);
        }
    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getUserTransaction-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getUserTransaction-i-finished`);
    }
}

exports.getAllTransaction = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getAllTransaction-i-started`);
    let client = getDbConnection();
    try {
        if (validations.validateUserId(req.user.user_id)) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_user_id);
            return;
        }
        if (validations.validatePageNumber(parseInt(req.params.page_number))) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_page_number);
            return;
        }
        if (validations.validatePageCount(parseInt(req.params.page_count))) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_page_count);
            return;
        }
        let number = (Number(req.params.page_number) - 1) * req.params.page_count;
        let result = await client.query(constants.query.wallet.getAllTransaction,[number,req.params.page_count]);
        if (result.rowCount == 0) {
            handleError(constants.response_code.not_found, req, res, constants.error_messages.wallet.not_found);
            return;
        }
        
            logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getAllTransaction-i-fetched from db`);
            res.send(result.rows);

    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getAllTransaction-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getAllTransaction-i-finished`);
    }
}

exports.getWalletDetail = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getWalletDetail-i-started`);
    let client = getDbConnection();
    try {
        if (validations.validateUserId(req.user.user_id)) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_user_id);
            return;
        }
        let result = await client.query(constants.query.wallet.getWalletDetail, [req.user.user_id]);
        if (result.rowCount == 0) {
            handleError(constants.response_code.not_found, req, res, constants.error_messages.wallet.not_found);
            return;
        }
        logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getWalletDetail-i-fetched from db`);
        res.send(result.rows);
    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getWalletDetail-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getWalletDetail-i-finished`);
    }
}

exports.getAllUserWallet = async (req, res) => {
    logWriter(`${req.user.user_id}-WalletController-getAllUserWallet-i-started`);
    let client = getDbConnection();
    try {
        if (validations.validateUserId(req.user.user_id)) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_user_id);
            return;
        }
        if (validations.validatePageNumber(parseInt(req.params.page_number))) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_page_number);
            return;
        }
        if (validations.validatePageCount(parseInt(req.params.page_count))) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_page_count);
            return;
        }
        let number = (Number(req.params.page_number) - 1) * req.params.page_count;
        let result = await client.query(constants.query.wallet.getAllUserWallet,[number,req.params.page_count]);
        if (result.rowCount == 0) {
            handleError(constants.response_code.not_found, req, res, constants.error_messages.wallet.not_found);
            return;
        }
        logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getAllUserWallet-i-fetched from db`);
        res.send(result.rows);
    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getAllUserWallet-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getAllUserWallet-i-finished`);
    }
}


exports.getTransactionByDate = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getTransactionByDate-i-started`);
    let client = getDbConnection();
    try {
        if (validations.validateUserId(req.user.user_id)) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_user_id);
            return;
        }
        if (validations.validateTransactionDate(req.params.from_date)) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_date);
            return;
        }
        if (validations.validateTransactionDate(req.params.to_date)) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_date);
            return;
        }
        if (validations.validateTiming(req.params.from_date, req.params.to_date)) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_date);
            return;
        }
        if (validations.validatePageNumber(parseInt(req.params.page_number))) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_page_number);
            return;
        }
        if (validations.validatePageCount(parseInt(req.params.page_count))) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_page_count);
            return;
        }
        let number = (Number(req.params.page_number) - 1) * req.params.page_count;
        let result = await client.query(constants.query.wallet.getTransactionByDate, [req.params.from_date, req.params.to_date,number,req.params.page_count]);
        if (result.rowCount == 0) {
            handleError(constants.response_code.not_found, req, res, constants.error_messages.wallet.not_found);
            return;
        }
        logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getTransactionByDate-i-fetched from db`);
        res.send(result.rows);
    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getTransactionByDate-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getTransactionByDate-i-finished`);
    }
}

exports.getTransaction = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getTransaction-i-started`);
    let client = getDbConnection();
    console.log(req.params.wallet_id);
    try {
        if (validations.validateUserId(req.user.user_id)) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_user_id);
            return;
        }
        if (validations.validateWalletId(parseInt(req.params.wallet_id))) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_wallet_id);
            return;    
        }
        let result = await client.query(constants.query.wallet.getTransaction, [req.params.wallet_id]);
        if (result.rowCount == 0) {
            handleError(constants.response_code.not_found, req, res, constants.error_messages.wallet.not_found);
            return;
        }
        logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getTransaction-i-fetched from db`);
        res.send(result.rows);
    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getTransaction-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-WalletController-getTransaction-i-finished`);
    }
}

const validateWallet = (req, res) => {

   
    if (validations.validateQuantity(req.body.quantity)) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_quantity);
        return true;
    }
    if (validations.validateProductId(req.body.product_id)) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_product_id);
        return true;
    }

    if (validations.validateUserId(req.user.user_id)) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_user_id);
        return true;
    }
    if (validations.validateMetaJson(req.body)) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.wallet.invalid_meta_json);
        return true;
    }
    return false;
}