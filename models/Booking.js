const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
      required: true,
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotels",
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    numRooms: {
      type: Number,
      required: true,
      min: 1, // Ensure at least one room is booked
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0, // Ensure price is not negative
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } } // Enable virtuals
);

// Virtual field to get customer email
bookSchema.virtual("customerEmail", {
  ref: "customers", // Refers to the 'customers' model
  localField: "customerId", // The field in the booking that links to customers
  foreignField: "_id", // The field in customers that links to the booking
  justOne: true, // We only need one customer per booking
  options: { select: "email" }, // Only select the 'email' field from the customer
});

// Virtual field to get hotel name
bookSchema.virtual("hotelName", {
  ref: "hotels", // Refers to the 'hotels' model
  localField: "hotelId", // The field in the booking that links to hotels
  foreignField: "_id", // The field in hotels that links to the booking
  justOne: true, // We only need one hotel per booking
  options: { select: "name" }, // Only select the 'name' field from the hotel
});

// Create the model
const Book = mongoose.model("books", bookSchema);
module.exports = Book;
