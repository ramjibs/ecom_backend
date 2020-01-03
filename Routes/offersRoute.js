const offerController = require("../Controllers/offersController");
const {checkToken}=require("../Services/passport.service");
const { ipMiddleware } = require("../Services/ip.service");

module.exports = app => {

     //call to insert the Offer details in the DB
     app.post("/api/admin/addOffer", checkToken,ipMiddleware, offerController.postOffer);

     //call to get the Offer details from DB 
     app.get("/api/admin/getOffer/:offer_id",checkToken,ipMiddleware, offerController.getOffer);

      //call to get the Offer details from DB 
      app.get("/api/admin/getAllOffer",checkToken,ipMiddleware, offerController.getAllOffer);

       //call to get the Offer details from DB 
       app.get("/api/admin/getValidOffer",checkToken,ipMiddleware, offerController.getValidOffer);

     app.get("/api/admin/getOfferByDate/:date",checkToken,ipMiddleware, offerController.getOfferByDate);

      //call to get the Offer details from DB 
      app.get("/api/admin/getProductOffer/:product_id",checkToken,ipMiddleware, offerController.getProductOffer);
 
     //call to update the Offer details in DB
     app.post("/api/admin/updateOffer/:offer_id",checkToken,ipMiddleware, offerController.updateOffer);
 
     //call to  delete the Offer  from DB
     app.post("/api/admin/deleteOffer/:offer_id", checkToken ,ipMiddleware, offerController.deleteOffer);

}