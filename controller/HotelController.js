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
    const { name, description, pricePerNight, rooms, location } = req.body;

    // Validate required fields
    if (!name || !description || !pricePerNight || !rooms || !location) {
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
      location, // Add the location field to the hotel document
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
    const { name, description, location, pricePerNight, rooms } = req.body;

    // Validate required fields
    if (!name || !description || !location || !pricePerNight || !rooms) {
      return res.status(400).json({ error: "All fields are required for update" });
    }

    // Find the current hotel by ID
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    // If no new image is provided, keep the existing image
    const image = req.file ? req.file.filename : hotel.image;

    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        location,  // Added location
        pricePerNight,
        rooms,
        image, // Use the current image if no new image is provided
      },
      { new: true } // Return the updated document
    );

    res.status(200).json(updatedHotel);
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
