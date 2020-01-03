const { getDbConnection } = require("../Utils/dbConnections");
const { handleError, logWriter } = require("../Utils/utilMethods");
const constants = require("../Config/constants");
const validations = require("../Utils/validations");
const moment = require("moment");
//internal imports
const fs = require("fs");

exports.add = async (req, res) => {
    logWriter(`add-i-${req.user.user_id}-${req.ip_address}-orders-started`);
    if (validateOrders(req, res)) {
        return;
    }

    let client = getDbConnection();
    try {
        for (i in req.body.orders) {
            q = req.body.orders[i];
            let from_date = q.from_date
            let to_date = q.to_date

            await client.query(constants.query.orders.add, [req.user.user_id, q.time_slot_id, q.order_date, q.quantity, q.frequency, q.price, from_date, to_date, q.order_status, q.order_type, q.address_id, q.product_id]);

            if (q.order_type == 'S') {
                for (j = parseInt(from_date); j <= parseInt(to_date); j = parseInt(q.frequency) * 86400000 + j) {
                    await client.query(constants.query.purchase_history.add, [q.quantity, j, q.time_slot_id, q.address_id, 'Pending', req.user.user_id, q.product_id])
                }
            }
            else {
                await client.query(constants.query.purchase_history.add, [q.quantity, q.delivery_date, q.time_slot_id, q.address_id, 'Pending', q.user_id, q.product_id])
            }
        }
        res.send({ "message_code": "success", "order_id": "123" });
    } catch (error) {
        console.log(error)
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.auth.internal_server_error);
        logWriter(`add-e-${req.user.user_id}-${req.ip_address}-orders-${error.toString()}`);
    } finally {
        client.end();
        // logWriter(`add-i-${req.user.user_id}-${req.ip_address}-orders-finally`);
    }
}



exports.get = async (req, res) => {
    logWriter(`get-i-${req.user.user_id}-${req.ip_address}-orders-started`);
    let client = getDbConnection();
    try {
        result = await client.query(constants.query.purchase_history.get, [req.user.user_id])
        res.send(result);
    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.internal_server_error);
        logWriter(`get-e-${req.user.user_id}-${req.ip_address}-orders-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`get-i-${req.user.user_id}-${req.ip_address}-orders-finally`);
    }
}


const validateOrders = (req, res) => {
    req.body.orders.map(q => {
        if (validations.validateFromTime(q.from_date)) {

            handleError(constants.response_code.bad_request, req, res, constants.error_messages.order.invalid_from_time);
            return true;
        }
        if (validations.validateToTime(q.to_date)) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.order.invalid_to_time);
            return true;
        }
        if (validations.validateTiming(q.from_date, q.to_date)) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.order.invalid_time);
            return true;
        }
        q.product_id
        if (validations.validateProductId(q.product_id)) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.product.invalid_product_id);
            return;
        }
        if (validations.validateSlotId(q.time_slot_id)) {
            handleError(constants.response_code.bad_request, req, res, constants.error_messages.slot.invalid_slot_id);
            return;
        }
    })
}