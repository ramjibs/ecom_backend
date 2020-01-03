const ordersController = require("../Controllers/orders.controller");
const { checkToken } = require("../Services/passport.service");
const { ipMiddleware } = require("../Services/ip.service");

module.exports = app => {
    app.post("/api/orders/add",  checkToken,  ipMiddleware, ordersController.add);

    app.get("/api/orders/get", checkToken,  ipMiddleware, ordersController.get);

   
}