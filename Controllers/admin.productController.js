const constants = require("../Config/constants");
const { getDbConnection } = require("../Utils/dbConnections");
const { logWriter } = require('../Utils/utilMethods');
const validations = require('../Utils/validations');
const {handleError} = require('../Utils/utilMethods');

exports.postProduct = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-admin.productController-postProduct-i-started`);
    let client = getDbConnection();
    try {
        if(validateProduct(req,res))
        {
            return;
        }
        await client.query(constants.query.product.addProduct, [req.body.name, req.body.description, req.body, req.body.price, req.body.discount]);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.productController-postProduct-i-added in db`);
        res.send({'message_code':'Success'});
        res.end();
    } catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.productController-postProduct-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.productController-postProduct-i-finished`);
    }
}
exports.getAllProduct = async (req, res,msg) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-admin.productController-getAllProduct-i-started`);
    let client = getDbConnection();
    try {
       
        let result = await client.query(constants.query.product.getAllProduct);
        res.send(result.rows)
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.productController-getAllProduct-i-Fetched from db`);
    }
    catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.productController-getAllProduct-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.productController-getAllProduct-i-finished`);
    }
}
exports.updateProduct = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-admin.productController-updateProduct-i-started`);
    let client = getDbConnection();
    try {
        if(validateProduct(req,res))
        {
            return;
        }
        let result = await client.query(constants.query.product.updateProduct,[req.params.product_id,req.body.name, req.body.description, req.body , req.body.price, req.body.discount]);
        res.send(result.rows)
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.productController-updateProduct-i-updated db`);
    }
    catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.productController-updateProduct-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.productController-updateProduct-i-finished`);
    }
}
exports.deleteProduct = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-admin.productController-deleteProduct-i-started`);
    let client = getDbConnection();
    try {
        if(validations.validateProductId(parseInt(req.params.product_id)))
    {
        handleError(constants.response_code.bad_request, req,res, constants.error_messages.product.invalid_product_id);
        return;
    }
        let result = await client.query(constants.query.product.deleteProduct,[req.params.product_id]);
        res.send(result.rows)
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.productController-deleteProduct-i-deleted from db`);
    }
    catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.productController-deleteProduct-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.productController-deleteProduct-i-finished`);
    }
}
exports.getProduct = async (req, res) => {
    logWriter(`${req.user.user_id}-${req.ip_address}-admin.productController-getProduct-i-started`);
    let client = getDbConnection();
    try {
       if(validations.validateProductId(parseInt(req.params.product_id)))
    {
        handleError(constants.response_code.bad_request,req, res, constants.error_messages.product.invalid_product_id);
        return;
    }
        let result = await client.query(constants.query.product.getProduct,[req.params.product_id]);
        if(result.rowCount==0)
        {
            handleError(constants.response_code.bad_request,req, res, constants.error_messages.product.not_found);
            return;
        }
        else
        {
        res.send(result.rows);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.productController-getProduct-i-Fetched from db`);
        }
    }
    catch (error) {
        handleError(constants.response_code.internal_server_error, req, res, constants.error_messages.general.internal_server_error);
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.productController-getProduct-e-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`${req.user.user_id}-${req.ip_address}-admin.productController-getProduct-i-finished`);
    }
}
const validateProduct = (req,res) =>
{
   
    if(validations.validateProductName(req.body.name))
    {
        handleError(constants.response_code.bad_request, req,res, constants.error_messages.product.invalid_name);
        return true;
    }
    if(validations.validateDescription(req.body.description))
    {
        handleError(constants.response_code.bad_request, req,res, constants.error_messages.product.invalid_description);
        return true;
    }
    if(validations.validatePrice(req.body.price))
    {
        handleError(constants.response_code.bad_request,req, res, constants.error_messages.product.invalid_price);
        return true;
    }
    if(validations.validateDiscount(req.body.discount))
    {
        handleError(constants.response_code.bad_request,req, res, constants.error_messages.product.invalid_discount);
        return true;
    }
    return false;
}
