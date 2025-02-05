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
const upload = multer({ storage });

router.get("/", findAll);
router.post("/", upload.single('file'), saveAll);
router.get("/:id", findById);
router.delete("/:id", deleteById);
router.put("/:id", upload.single('file'), update);

module.exports = router;
