const Credential = require("../models/Credential");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// JWT Secret (instead of using .env, it's hardcoded here)
const JWT_SECRET = "your_jwt_secret"; // Replace with a secure secret key

// Register a new user or admin
exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const existingUser = await Credential.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCredential = new Credential({
      username,
      password: hashedPassword,
      role,
    });

    await newCredential.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

// Login a user or admin
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Credential.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET, // Using the hardcoded JWT secret
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
};
