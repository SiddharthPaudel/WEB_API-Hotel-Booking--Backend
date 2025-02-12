const Booking = require("../models/Booking");

// Get all bookings
exports.findAll = async (req, res) => {
  try {
      const bookings = await Booking.find();
      if (!bookings.length) {
          return res.status(404).json({ message: "No bookings found" });
      }
      res.json({ data: bookings });
  } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Server error" });
  }
};

// Get bookings for a specific user
exports.findByCustomerId = async (req, res) => {
  const { customerId } = req.params; // Extract customerId from URL parameters
  
  if (!customerId) {
    return res.status(400).json({ message: "Customer ID is required." });
  }

  try {
    // Query the database for bookings related to the customerId
    const bookings = await Booking.find({ customerId }); // Change this line based on your ORM

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this customer." });
    }

    res.status(200).json(bookings); // Respond with the bookings data
  } catch (error) {
    console.error("Error fetching bookings by customerId:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// Create a new booking
exports.saveAll = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
