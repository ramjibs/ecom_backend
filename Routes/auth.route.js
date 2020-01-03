const authControllers = require("../Controllers/auth.controller");
const { checkToken } = require("../Services/passport.service");
const { ipMiddleware } = require("../Services/ip.service");

module.exports = app => {
    app.post("/api/auth/signin", ipMiddleware, authControllers.signIn);

    app.post("/api/auth/signup", ipMiddleware, authControllers.signUp);

    app.post("/api/auth/verifyOtp", ipMiddleware, authControllers.verifyOtp);

    app.get("/api/auth/requestOtp/:phone_number", ipMiddleware, authControllers.requestOtp);

    app.post("/api/auth/updatePassword", ipMiddleware, authControllers.updatePassword);
}
