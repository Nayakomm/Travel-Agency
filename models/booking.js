const router = require("express").Router();
const Booking = require("../models/Booking"); // relative path - important

// SAVE BOOKING
router.post("/", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ success: true, booking: newBooking });
  } catch (err) {
    console.error("Booking save error:", err);
    res.status(500).json({ error: "Failed to save booking" });
  }
});

// GET ALL BOOKINGS (Admin Panel)
router.get("/all", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("Fetch bookings error:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// DELETE BOOKING
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("Delete booking error:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;