const express = require("express");
const connectDB = require("./config/db");
const customerRoutes = require("./routes/customerRoutes");
const authRoutes = require("./routes/authRoutes");

const { verifyToken } = require("./middleware/authMiddleware");

const app = express();
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // Authentication routes (no token required here)
app.use("/api/customers", verifyToken, customerRoutes); // Protect customer routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
