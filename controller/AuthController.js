const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "8261ba19898d0dcdfe6c0c411df74b587b2e54538f5f451633b71e39f957cf01";
const Customer = require("../models/Customer");

// Registration Endpoint
const register = async (req, res) => {
  try {
    const { username, email, password, role, contact_no } = req.body;

    // Normalize email to lowercase
    const emailLower = email.toLowerCase();

    // Check if email already exists
    const existingUser = await Customer.findOne({ email: emailLower });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save customer in the database
    const customer = new Customer({
      username,
      email: emailLower,
      password: hashedPassword,
      role,
      contact_no, // Optional: Save contact number if provided
    });
    await customer.save();

    // Return the user details including ID
    res.status(201).json({
      message: 'Registration successful',
      user: {
        _id: customer._id,
        username: customer.username,
        email: customer.email,
      },
    });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ error: 'Something went wrong during registration' });
  }
};


// Login Endpoint
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Normalize email to lowercase
    const emailLower = email.toLowerCase();

    // Find user by email
    const customer = await Customer.findOne({ email: emailLower });
    if (!customer) {
      return res.status(403).json({ error: "Invalid email or password" });
    }

    // Check if account is active
    if (!customer.isActive) {
      return res.status(403).json({ error: "Your account is inactive. Please contact admin to activate." });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      return res.status(403).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: customer.email, role: customer.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Respond with token, customerId, and other user data
    res.status(200).json({
      message: "Login successful",
      token,
      customerId: customer._id, // Include customerId in response
      email: customer.email,
      username: customer.username, // ✅ Rename 'name' to 'username' for consistency
    });

  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Something went wrong during login" });
  }
};





module.exports = {
  register,
  login,
};
