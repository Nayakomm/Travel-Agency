
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const contactRoutes = require("./routes/contact");
const bookingRoutes = require("./routes/booking");
const adminRoutes = require("./routes/admin");

const app = express();
app.use(cors());
app.use(express.json());

// ===== ROUTES =====
app.use("/api/contact", contactRoutes);
app.use("/api/book", bookingRoutes);      // POST booking
app.use("/api/bookings", bookingRoutes);  // e.g. GET /all for admin UI
app.use("/api/admin", adminRoutes);

// optional: serve static front-end if you want (uncomment when needed)
// app.use(express.static(path.join(__dirname, "public")));

// ===== CONNECT MONGO =====
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/travel_with_omm";
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => {
  console.error("Mongo connection error:", err);
  process.exit(1);
});