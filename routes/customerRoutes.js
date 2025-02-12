const express=require("express");
const { findAll, saveAll,findById, deleteById, update ,   getActiveStatus,
    updateActiveStatus, } = require("../controller/CustomersController");
const CustomerValidation=require("../validation/CustomerValidation")

const router=express.Router();




router.get("/",findAll);
router.post("/",CustomerValidation,saveAll);
router.get("/:id",findById);
router.delete("/:id",deleteById);
router.put("/:id",update);
router.get("/active-status/:id",getActiveStatus);

// Route to update the active status of a customer
router.put("/active-status/:id",updateActiveStatus);
module.exports=router;