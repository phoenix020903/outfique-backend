require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Load models
require("./models/User");
require("./models/OutfitCard"); // <-- Add this line

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const authRoutes = require("./routes/routes");
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT || 5000, () => console.log("Server running"))
  )
  .catch((err) => console.error(err));

const db = mongoose.connection;
db.on("connected", () => {
  console.log("MongoDB connected successfully!");
});
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
db.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});
