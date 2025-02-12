const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  role: { type: String, default: "customer" }, // e.g., "admin", "customer"
  contact_no: {
    type: String,
  },
  isActive: { type: Boolean, default: true},  // Adding isActive field
});

const Customer = mongoose.model("customers", customerSchema);
module.exports = Customer;
