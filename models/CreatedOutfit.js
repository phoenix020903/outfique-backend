
const mongoose = require("mongoose");

const adjustmentSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Garment",
      required: true,
    },
    x: Number,
    y: Number,
    width: Number,
    height: Number,
  },
  { _id: false }
);

const createdOutfitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mannequin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Garment",
    required: true,
  },
  garments: {
    top: { type: adjustmentSchema, default: null },
    bottom: { type: adjustmentSchema, default: null },
    shoes: { type: adjustmentSchema, default: null },
    accessory: { type: adjustmentSchema, default: null },
  },
  garmentOrder: [
    { type: String, enum: ["top", "bottom", "shoes", "accessory"] },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CreatedOutfit", createdOutfitSchema);
