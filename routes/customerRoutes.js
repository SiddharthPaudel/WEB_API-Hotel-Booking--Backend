const express = require("express");
const router = express.Router();
const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/CustomerController");

// Create a new customer
router.post("/", createCustomer);

// Get all customers
router.get("/", getCustomers);

// Get a single customer by ID
router.get("/:id", getCustomerById);

// Update a customer
router.put("/:id", updateCustomer);

// Delete a customer
router.delete("/:id", deleteCustomer);

module.exports = router;
