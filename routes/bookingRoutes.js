const express=require("express");
const { findAll, saveAll } = require("../controller/BookingController");
// const { userValidation } = require("../validation/CustomerValidation");
// const { authorization } = require("../security/auth");
const router=express.Router();
router.get("/",findAll);
router.post("/",saveAll);
module.exports=router;

