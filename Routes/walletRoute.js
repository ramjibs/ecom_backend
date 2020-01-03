const walletController = require("../Controllers/walletController");
const {checkToken}=require("../Services/passport.service");
const { ipMiddleware } = require("../Services/ip.service");




module.exports = app => {

    app.post("/api/wallet/addWallet",checkToken,ipMiddleware,walletController.addWallet);
    app.get("/api/wallet/getUserTransaction/:page_number/:page_count",checkToken,ipMiddleware,walletController.getUserTransaction);
    app.get("/api/wallet/getAllTransaction/:page_number/:page_count",checkToken,ipMiddleware,walletController.getAllTransaction);
    app.get("/api/wallet/getWalletDetail",checkToken,ipMiddleware,walletController.getWalletDetail);
    app.get("/api/wallet/getAllUserWallet/:page_number/:page_count",checkToken,ipMiddleware,walletController.getAllUserWallet);
    app.get("/api/wallet/getTransactionByDate/:from_date/:to_date/:page_number/:page_count",checkToken,ipMiddleware,walletController.getTransactionByDate);
    app.get("/api/wallet/getTransaction/:wallet_id",checkToken,ipMiddleware,walletController.getTransaction);
}
