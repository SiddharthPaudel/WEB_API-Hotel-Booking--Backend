const express = require("express");
const { findAll, saveAll, findById, deleteById, update } = require("../controller/HotelController");
const { authenticateToken } = require("../security/Authorize");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, 'hotel_images'); // Make sure the folder is accessible and exists
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    cb(null, timestamp + '-' + file.originalname); // Ensure unique filenames
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error("Only images (jpeg, jpg, png, webp) are allowed!"));
    }
  }
});


router.get("/", findAll);
router.post("/", upload.array('images',5), saveAll);
router.get("/:id", findById);
router.delete("/:id", deleteById);
router.put("/:id", upload.array('images',5), update);

module.exports = router;
