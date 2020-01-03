const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { generateToken } = require("./Services/passport.service");

//app set up
const app = express();

//project set up
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
app.use((req, res, next) => {
    if (req.headers["authorization"] == "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOi0yMTQ3NDgzNjQ3fQ.KwGwfeF35B1HebMZorfkaYULW5ZsveBuvjm090zkMtw") {
        req.headers["authorization"] = generateToken(req.get("user_id"));
    }
    next();
});


require("./Routes/auth.route")(app);
require("./Routes/address.route")(app);
require("./Routes/adminRoute")(app);
require("./Routes/walletRoute")(app);
require("./Routes/offersRoute")(app);
require("./Routes/orders.route")(app);


app.listen(1122);
