const slotController = require("../Controllers/admin.slotController");
const productController = require("../Controllers/admin.productController");
const {checkToken}=require("../Services/passport.service");
const { ipMiddleware } = require("../Services/ip.service");


module.exports = app => {
/*
    //----------PLAN(Admin can perform CRUD Operation to add and moify the plans)-------------------

    //call to insert the plan details in the DB
    app.post("/api/admin/addPlan", checkToken, ipMiddleware, planController.postPlan);

    //call to get the plan details from DB 
    app.get("/api/admin/getPlan", checkToken, ipMiddleware, planController.getPlan);

    //call to update the plan details in DB
    app.upate("/api/admin/updatePlan", checkToken, ipMiddleware, planController.updatePlan);

    //call to  delete the plan  from DB
    app.delete("/api/admin/deletePlan", checkToken, ipMiddleware, planController.deletePlan);
*/
    //-----------PRODUCT(Admin can perform CRUD operation to add and modify the products)
    
    //call to insert the Product details in the DB
    app.post("/api/admin/addProduct", checkToken,ipMiddleware, productController.postProduct);

    //call to get the Product details from DB 
    app.get("/api/admin/getProduct/:product_id",checkToken,ipMiddleware, productController.getProduct);

    app.get("/api/admin/getAllProduct",checkToken,ipMiddleware, productController.getAllProduct);

    //call to update the Product details in DB
    app.post("/api/admin/updateProduct/:product_id",checkToken, ipMiddleware,productController.updateProduct);

    //call to  delete the Product  from DB
    app.post("/api/admin/deleteProduct/:product_id",checkToken,ipMiddleware,  productController.deleteProduct);

     //call to insert the Slot details in the DB
     app.post("/api/admin/addSlot", checkToken,ipMiddleware, slotController.postSlot);

     //call to get the Slot details from DB 
     app.get("/api/admin/getSlot",checkToken,ipMiddleware, slotController.getSlot);
 
     //call to update the Slot details in DB
     app.post("/api/admin/updateSlot/:slot_id",checkToken,ipMiddleware, slotController.updateSlot);
 
     //call to  delete the Slot  from DB
     app.post("/api/admin/deleteSlot/:slot_id", checkToken ,ipMiddleware, slotController.deleteSlot);
}