//external imports
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;//generating the token
const ExtractJwt = require("passport-jwt").ExtractJwt;//getting the token from header
const jwt = require("jwt-simple");

//utils
const { getDbConnection } = require("../Utils/dbConnections");
const { handleError, logWriter } = require("../Utils/utilMethods");

//config
const keys = require("../Config/keys");
const constants = require("../Config/constants");
   
//internal imports
const fs = require("fs");

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: keys.jwtSecretCode
};//gives data to where to take the token and key

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {//get the user id from token //payload has the user id
    logWriter(`jwt_login-i-null-null-passport-started`);
   
    let client = getDbConnection();
    try {
        
        let result = await client.query(constants.query.auth_query, [payload.sub]);
        if (result.rows.length == 0) {
            logWriter(`jwt_login-w-null-null-passport-unauthorized-${payload.sub}`);
            return done(null, false);
        } else {
            logWriter(`jwt_login-i-${result.rows[0].user_id}-null-passport-authorized`);
            return done(null, result.rows[0]);
        }
    } catch (error) {
          handleError(constants.response_code.internal_server_error,res, constants.error_messages.internal_server_error);
        logWriter(`jwt_login-e-null-null-passport-${error.toString()}`);
    } finally {
        client.end();
        logWriter(`jwt_login-i-null-null-passport-finished`);
    }
});

passport.use("userLogin", jwtLogin);


exports.checkToken = passport.authenticate("userLogin", { session: false });


exports.generateToken = user_id => {
    return jwt.encode({ sub: user_id }, keys.jwtSecretCode);
};