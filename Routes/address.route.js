const addressController = require("../Controllers/address.controller");
const { checkToken } = require("../Services/passport.service");
const { ipMiddleware } = require("../Services/ip.service");

module.exports = app => {
    app.post("/api/address/add", checkToken, ipMiddleware, addressController.add);

    app.post("/api/address/update", checkToken, ipMiddleware, addressController.update);

    app.get("/api/address/get", checkToken, ipMiddleware, addressController.get);

    app.delete("/api/address/delete/:id", checkToken, ipMiddleware, addressController.delete);

    app.post("/api/address/setPrimary/:id", checkToken, ipMiddleware, addressController.setPrimary);
}