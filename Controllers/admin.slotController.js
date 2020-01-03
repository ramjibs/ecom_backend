const constants = require("../Config/constants");
const { getDbConnection } = require("../Utils/dbConnections");
const { logWriter } = require('../Utils/utilMethods');
const validations = require('../Utils/validations');
const {handleError} = require('../Utils/utilMethods');

exports.postSlot = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-admin.slotController-postSlot-i-started`);
    let client = getDbConnection();
    try {
        if(validateSlot(req,res))
        {
            return;
        }
        await client.query(constants.query.slot.addSlot, [req.body.from_time, req.body.to_time]);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.slotController-postSlot-i-added in db`);
        res.send({'message_code':'Success'});
       
    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.slotController-postSlot-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.slotController-postSlot-i-finished`);
    }
}

exports.updateSlot = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-admin.slotController-updateSlot-i-started`);
    let client = getDbConnection();
    try {
        if(validateSlot(req,res))
        {
            return;
        }
        let result = await client.query(constants.query.slot.updateSlot,[req.params.slot_id,req.body.from_time, req.body.to_time]);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.slotController-updateSlot-i-updated db`);
        res.send({'message_code':'Success'});
    }
    catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.slotController-updateSlot-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.slotController-updateSlot-i-finished`);
    }
}
exports.deleteSlot = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-admin.slotController-deleteSlot-i-started`);
    let client = getDbConnection();
    try {
      
        let result = await client.query(constants.query.slot.deleteSlot,[req.params.slot_id]);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.slotController-deleteSlot-i-deleted from db`);
        res.send({'message_code':'Success'});
    }
    catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.slotController-deleteSlot-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.slotController-deleteSlot-i-finished`);
    }
}
exports.getSlot = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-admin.slotController-getSlot-i-started`);
    let client = getDbConnection();
    try {
      
        let result = await client.query(constants.query.slot.getSlot);
        if(result.rowCount==0)
        {
           res.send([]);
        }
        else
        {
        res.send(result.rows);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.slotController-getSlot-i-Fetched from db`);
        }
    }
    catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.slotController-getSlot-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.slotController-getSlot-i-finished`);
    }
}
const validateSlot = (req,res) =>
{
    if(validations.validateFromTime(req.body.from_time))
    {
        handleError(constants.response_code.bad_request, req,res, constants.error_messages.slot.invalid_from_time);
        return true;
    }
    if(validations.validateToTime(req.body.to_time))
    {
        handleError(constants.response_code.bad_request, req,res, constants.error_messages.slot.invalid_to_time);
        return true;
    }
    
}


