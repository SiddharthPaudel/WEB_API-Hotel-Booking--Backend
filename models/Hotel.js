const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
    required: true,
  }],
  description: {
    type: String,
    required: true,
  },
  pricePerNight: {
    type: Number, // Numeric value for price
    required: true,
    min: 0, // Ensures price is not negative
  },
  rooms: {
    type: String,
    required: true,
    enum: ["Available", "Booked", "Under Maintenance"], // Restricts to predefined values
    default: "Available", // Default status
  },
  location:{
    type:String,
    required:true
  },
  
});

const Hotel = mongoose.model("hotels", hotelSchema);
module.exports = Hotel;
