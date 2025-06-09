const mongoose = require("mongoose");

const garmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["top", "bottom", "shoes", "accessory", "mannequin"],
    required: true,
  },
  image: { type: String, required: true },
  // You can add more fields like color, brand, etc as needed
});

module.exports = mongoose.model("Garment", garmentSchema);
