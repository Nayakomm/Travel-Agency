const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gmail: { type: String },
  whatsapp: { type: String },
  phone: { type: String },
  package: { type: String },
  travelDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("Booking", BookingSchema);