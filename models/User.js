const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    savedOutfits: [{ type: mongoose.Schema.Types.ObjectId, ref: "OutfitCard" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
