const express = require("express");
const { register, login } = require("../controllers/AuthController"); // Correct import

const router = express.Router();

// Register route
router.post("/register", register); // Using destructured 'register' function

// Login an existing user
router.post("/login", login); // Using destructured 'login' function

module.exports = router;
