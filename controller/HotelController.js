const Hotel = require("../models/Hotel");

// Retrieve all hotels
const findAll = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch hotels", details: e.message });
  }
};

// Save a new hotel
const saveAll = async (req, res) => {
  try {
    const { name, description, pricePerNight, rooms } = req.body;

    // Validate required fields
    if (!name || !description || !pricePerNight || !rooms) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate rooms status (ensure it is one of the allowed values)
    const allowedRoomStatuses = ["Available", "Booked", "Under Maintenance"];
    if (!allowedRoomStatuses.includes(rooms)) {
      return res.status(400).json({ error: "Invalid room status" });
    }

    const hotel = new Hotel({
      name,
      description,
      pricePerNight,
      rooms, // Rooms will be the status string (e.g., "Available", "Booked", "Under Maintenance")
      image: req.file ? req.file.originalname : null, // Handle file upload if available
    });

    await hotel.save();
    res.status(201).json(hotel);
  } catch (e) {
    res.status(500).json({ error: "Failed to save hotel", details: e.message });
  }
};

// Find a hotel by ID
const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch hotel", details: e.message });
  }
};

// Delete a hotel by ID
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findByIdAndDelete(id);

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: "Failed to delete hotel", details: e.message });
  }
};

// Update a hotel by ID
const update = async (req, res) => {
  try {
    const { name, description, pricePerNight, rooms } = req.body;

    // Validate required fields
    if (!name || !description || !pricePerNight || !rooms) {
      return res.status(400).json({ error: "All fields are required for update" });
    }

    // Validate rooms status (ensure it is one of the allowed values)
    const allowedRoomStatuses = ["Available", "Booked", "Under Maintenance"];
    if (!allowedRoomStatuses.includes(rooms)) {
      return res.status(400).json({ error: "Invalid room status" });
    }

    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { name, description, pricePerNight, rooms, image: req.file ? req.file.originalname : null },
      { new: true } // Return the updated document
    );

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (e) {
    res.status(500).json({ error: "Failed to update hotel", details: e.message });
  }
};

module.exports = {
  findAll,
  saveAll,
  findById,
  deleteById,
  update,
};
