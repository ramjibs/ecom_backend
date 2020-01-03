const userController = require("../Controllers/userController");
const { checkToken } = require("../Services/passport.service");
const { ipMiddleware } = require("../Services/ip.service");

module.exports = app => {


    app.get("/api/user/getUserList/:page_number/:page_count", checkToken, ipMiddleware, userController.getUserList);
    app.get("/api/user/getUser", checkToken, ipMiddleware, userController.getUser);
    app.get("/api/user/getUserByName/:user_name", checkToken, ipMiddleware, userController.getUserByName);
    app.get("/api/user/getUserByPhone/:phone_number", checkToken, ipMiddleware, userController.getUserByPhone);

   
}