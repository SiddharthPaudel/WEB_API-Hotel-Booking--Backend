const Customer = require("../models/Customer");
const nodemailer = require("nodemailer");
require("dotenv").config(); // For environment variables

const findAll = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch customers", details: e.message });
  }
};

const saveAll = async (req, res) => {
    try {
      const customer = new Customer(req.body);
  
      // Validate required fields
      if (!req.body.email || !req.body.username) {
        return res.status(400).json({ error: "Email and username are required for registration" });
      }
  
      await customer.save();
  
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "psiddhartha62@gmail.com", // Use environment variables
          pass:"wzbysxugeehsmpog",
        },
      });
  
      const info = await transporter.sendMail({
        from: "psiddhartha62@gmail.com",
        to: customer.email,
        subject: "Customer Registration",
        html: `
          <h1>Your registration has been completed</h1>
          <p>Your username is <strong>${customer.username}</strong></p>
        `,
      });
  
      res.status(201).json({ customer, emailInfo: info });
    } catch (e) {
      res.status(500).json({ error: "Failed to save customer", details: e.message });
    }
  };

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch customer", details: e.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: "Failed to delete customer", details: e.message });
  }
};
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndUpdate(id, req.body, { new: true });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (e) {
    res.status(500).json({ error: "Failed to update customer", details: e.message });
  }
};

module.exports = {
  findAll,
  saveAll,
  findById,
  deleteById,
  update,
};
