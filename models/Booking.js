const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  customerEmail: { type: String, required: true },  // ✅ Added
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  hotelName: { type: String, required: true },  // ✅ Added
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  numRooms: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model("Booking", BookingSchema);
