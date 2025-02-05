const Hotel = require("../models/Hotel");

// Retrieve all hotels
const findAll = async (req, res) => {
  try {
      const hotels = await Hotel.find();
      const updatedHotels = hotels.map(hotel => ({
          ...hotel._doc,
          image: hotel.image ? `http://localhost:5000/hotel_images/${hotel.image}` : null
      }));
      res.status(200).json(updatedHotels);
  } catch (error) {
      res.status(500).json({ error: "Error fetching hotels", details: error.message });
  }
};


// Save a new hotel
const saveAll = async (req, res) => {
  try {
    const { name, location, description, pricePerNight, rooms } = req.body;

    if (!name || !location || !description || !pricePerNight || !rooms) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Handle multiple images
    const images = req.files ? req.files.map(file => file.filename) : [];

    // Save hotel with image paths
    const newHotel = new Hotel({
      name,
      location,
      description,
      pricePerNight,
      rooms,
      images
    });

    await newHotel.save();

    // Send back the image URLs
    res.status(201).json({
      ...newHotel._doc,
      images: images.map(image => `http://localhost:5000/hotel_images/${image}`)
    });

  } catch (error) {
    console.error("Error saving hotel:", error);
    res.status(500).json({ error: "Failed to create hotel", details: error.message });
  }
};



const update = async (req, res) => {
  try {
      const { name, location, description, pricePerNight, rooms } = req.body;
      const hotel = await Hotel.findById(req.params.id);

      if (!hotel) {
          return res.status(404).json({ error: "Hotel not found" });
      }

      // Keep existing images if no new ones are uploaded
      const images = req.files.length > 0 ? req.files.map(file => file.filename) : hotel.images;

      const updatedHotel = await Hotel.findByIdAndUpdate(
          req.params.id,
          { name, location, description, pricePerNight, rooms, images },
          { new: true }
      );

      res.status(200).json({
          ...updatedHotel._doc,
          images: images.map(image => `http://localhost:5000/hotel_images/${image}`)
      });

  } catch (e) {
      res.status(500).json({ error: "Failed to update hotel", details: e.message });
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


  
  

module.exports = {
  findAll,
  saveAll,
  findById,
  deleteById,
  update,
};
