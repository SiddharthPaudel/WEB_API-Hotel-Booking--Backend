const express=require("express");
const { findAll, saveAll,findById, deleteById, update } = require("../controller/CustomersController");

const router=express.Router();




router.get("/",findAll);
router.post("/",saveAll);
router.get("/:id",findById);
router.delete("/:id",deleteById);
router.put("/:id",update);
module.exports=router;
