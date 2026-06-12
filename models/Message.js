require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const contactRoutes = require("./routes/contact");
const bookingRoutes = require("./routes/booking");
const adminRoutes = require("./routes/admin");

const app = express();
app.use(cors());
app.use(express.json());

// ===== ROUTES =====
app.use("/api/contact", contactRoutes);
app.use("/api/book", bookingRoutes);
app.use("/api/bookings", bookingRoutes);   // for admin table
app.use("/api/admin", adminRoutes);

// ===== CONNECT MONGO =====
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(5000, () => console.log("Server running on port 5000"));
})
.catch((err) => console.error(err));