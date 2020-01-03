const constants = require("../Config/constants");
const { getDbConnection } = require("../Utils/dbConnections");
const { logWriter } = require('../Utils/utilMethods');
const validations = require('../Utils/validations');
const { handleError } = require('../Utils/utilMethods');

exports.postOffer = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-postOffer-i-started`);
    let client = getDbConnection();
    try {
        if (validateOffer(req, res)) {
            return;
        }
        let productCheck = await client.query(constants.query.Offer.productCheck, [req.body.product_id]);
        if (productCheck.rowCount == 0) {
            handleError(constants.response_code.not_found, req, res, constants.error_messages.product.not_found);
            return;
        }
        await client.query(constants.query.Offer.addOffer, [req.body.product_id, req.body.offer_name, req.body.offer_description, req.body.discount, req.body.valid_from, req.body.valid_to]);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-postOffer-i-added in db`);
        res.send({'message_code':'Success'});
    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-postOffer-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-postOffer-i-finished`);
    }
}

exports.updateOffer = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-updateOffer-i-started`);
    let client = getDbConnection();
    try {
        if (validateOffer(req, res)) {
            return;
        }
        if (validations.validateOfferId(parseInt(req.params.offer_id))) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.Offer.invalid_offer_id);
            return;
        }
        let offerCheck = await client.query(constants.query.Offer.offerCheck, [req.params.offer_id]);
        if (offerCheck.rowCount == 0) {
            handleError(constants.response_code.not_found, req, res, constants.error_messages.offer.not_found);
            return;
        }
        let result = await client.query(constants.query.Offer.updateOffer, [req.params.offer_id, req.body.product_id, req.body.offer_name, req.body.offer_description, req.body.discount, req.body.valid_from, req.body.valid_to]);
        res.send({'message_code':'Success'});
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-updateOffer-i-updated db`);
    }
    catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-updateOffer-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-updateOffer-i-finished`);
    }
}


exports.deleteOffer = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-deleteOffer-i-started`);
    let client = getDbConnection();
    try {
        if (validations.validateOfferId(parseInt(req.params.offer_id))) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.offer.invalid_offer_id);
            return;
        }
        let offerCheck = await client.query(constants.query.Offer.offerCheck, [req.params.offer_id]);
        if (offerCheck.rowCount == 0) {
            handleError(constants.response_code.not_found, req, res, constants.error_messages.offer.not_found);
            return;
        }
        let result = await client.query(constants.query.Offer.deleteOffer, [req.params.offer_id]);
        res.send({'message_code':'Success'});
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-deleteOffer-i-deleted from db`);
    }
    catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-deleteOffer-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-deleteOffer-i-finished`);
    }
}
exports.getAllOffer = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-getAllOffer-i-started`);
    let client = getDbConnection();
    try {

        let result = await client.query(constants.query.Offer.getAllOffer);
    if (result.rowCount == 0) {
            res.send([]);
        }
        else {
            res.send(result.rows);
            logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-getAllOffer-i-Fetched from db`);
        }
    }
    catch (error) {
console.log(error);
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-getAllOffer-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-getAllOffer-i-finished`);
    }
}


exports.getProductOffer = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-getProductOffer-i-started`);
    let client = getDbConnection();
    try {

        let result = await client.query(constants.query.Offer.getProductOffer,[req.params.product_id]);
        if (result.rowCount == 0) {
            res.send([]);
        }
        else {
            res.send(result.rows);
            logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-getProductOffer-i-Fetched from db`);
        }
    }
    catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-getProductOffer-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-getProductOffer-i-finished`);
    }
}

exports.getValidOffer = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-getValidOffer-i-started`);
    let client = getDbConnection();
    try {

        let result = await client.query(constants.query.Offer.getValidOffer);
        if (result.rowCount == 0) {
            res.send([]);
        }
        else {
            res.send(result.rows);
            logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-getValidOffer-i-Fetched from db`);
        }
    }
    catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-getValidOffer-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-getValidOffer-i-finished`);
    }
}




exports.getOffer = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-getOffer-i-started`);
    let client = getDbConnection();
    try {

        let result = await client.query(constants.query.Offer.getOffer, [req.params.offer_id]);
        if (result.rowCount == 0) {
            res.send([]);
        }
        else {
            res.send(result.rows);
            logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-getOffer-i-Fetched from db`);
        }
    }
    catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-getOffer-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-getOffer-i-finished`);
    }
}



exports.getOfferByDate = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-getOffer-i-started`);
    let client = getDbConnection();
    try {

        let result = await client.query(constants.query.Offer.getOffer, [req.params.date]);
        if (result.rowCount == 0) {
            res.send([]);
        }
        else {
            res.send(result.rows);
            logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-getOffer-i-Fetched from db`);
        }
    }
    catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-getOffer-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.OfferController-getOffer-i-finished`);
    }
}
const validateOffer = (req, res) => {
    if (validations.validateFromTime(parseInt(req.body.valid_from))) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.slot.invalid_from_time);
        return true;
    }
    if (validations.validateToTime(parseInt(req.body.valid_to))) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.slot.invalid_to_time);
        return true;
    }
    if (validations.validateTiming(parseInt(req.body.valid_from),parseInt(req.body.valid_to))) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.slot.invalid_time);
        return true;
    }
    if (validations.validateProductId(req.body.product_id)) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.product.invalid_product_id);
        return;
    }
    if (validations.validateProductName(req.body.offer_name)) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.offer.invalid_name);
        return true;
    }
    if (validations.validateDescription(req.body.offer_description)) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.offer.invalid_description);
        return true;
    }
    if (validations.validateDiscount(req.body.discount)) {
        handleError(constants.response_code.bad_request, req, res, constants.error_messages.offer.invalid_discount);
        return true;
    }
}
