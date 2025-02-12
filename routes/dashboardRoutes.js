const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controller/DashboardController");

// Route to get dashboard statistics
router.get("/dashboard", getDashboardStats);

module.exports = router;
