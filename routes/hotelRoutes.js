const express=require("express");
const { findAll, saveAll,findById, deleteById, update } = require("../controller/HotelController");
// const { userValidation } = require("../validation/userValidation");
const { authenticateToken} = require("../security/Auth");

const router=express.Router();



const multer=require("multer");
const { func } = require("joi");
const storage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'ground_images')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload=multer({storage})

router.get("/", findAll);// secure garnuxa vane authtoken use garni 
router.post("/",upload.single('file'),saveAll);
router.get("/:id",findById);
router.delete("/:id",deleteById);
router.put("/:id", upload.single('file'), update);
module.exports=router;
