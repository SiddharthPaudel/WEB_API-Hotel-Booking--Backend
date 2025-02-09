const Booking = require("../models/Booking");

const findAll = async (req, res) => {
  try {
    const bookings = await Booking.find(); 
    res.status(200).json({
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (e) {
    console.error("Error fetching bookings:", e);
    res.status(500).json({
      message: "Failed to fetch bookings",
      error: e.message || e,
    });
  }
};

const saveAll = async (req, res) => {
  try {
    const books = new Booking(req.body);
    await books.save();
    res.status(201).json({
      message: "Booking created successfully",
      data: books,
    });
  } catch (e) {
    console.error("Error saving booking:", e);
    res.status(400).json({
      message: "Booking creation failed",
      error: e.message || e,
    });
  }
};

module.exports = {
  findAll,
  saveAll,
};
