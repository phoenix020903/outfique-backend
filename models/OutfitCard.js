const mongoose = require("mongoose");

const OutfitItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
});

const OutfitCardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  items: [OutfitItemSchema],
  occasion: { type: String, required: true },
  likes: { type: Number, default: 0 },
  size: { type: String, required: true }, // <-- Added
  style: { type: String, required: true }, // <-- Added
});

module.exports = mongoose.model("OutfitCard", OutfitCardSchema);
