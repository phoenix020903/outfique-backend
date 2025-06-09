const express = require("express");
const router = express.Router();
const User = require("../models/User");
const OutfitCard = require("../models/OutfitCard");
const Garment = require("../models/Garment");
const CreatedOutfit = require("../models/CreatedOutfit");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET;
// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    console.log(`Signup Success: ${email} (${firstName} ${lastName})`);
    res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    console.log(`Login Success: ${email}`);
    res.json({
      message: "Login successful.",
      token,
      user: {
        _id: user._id, // <-- ADD THIS LINE!
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
router.get("/users/:userId/profile", async (req, res) => {
  try {
    const { userId } = req.params;
    // You can select only necessary fields if desired
    const user = await User.findById(userId).select(
      "firstName lastName email avatar"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar, // Add avatar to your schema if you want to store avatar URLs
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch user profile", error: err.message });
  }
});

// Get all outfit cards
router.get("/outfits", async (req, res) => {
  try {
    const outfits = await OutfitCard.find();
    res.json(outfits);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch outfits", error: err.message });
  }
});

router.post("/outfits/:id/like", async (req, res) => {
  try {
    const outfitId = req.params.id;
    const updated = await OutfitCard.findByIdAndUpdate(
      outfitId,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Outfit not found" });
    }
    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to like outfit", error: err.message });
  }
});

// Unlike an outfit card (decrement likes, but not below 0)
router.post("/outfits/:id/unlike", async (req, res) => {
  try {
    const outfitId = req.params.id;
    const outfit = await OutfitCard.findById(outfitId);
    if (!outfit) {
      return res.status(404).json({ message: "Outfit not found" });
    }
    if (outfit.likes > 0) {
      outfit.likes -= 1;
      await outfit.save();
    }
    res.json(outfit);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to unlike outfit", error: err.message });
  }
});
router.post("/users/:userId/save/:outfitId", async (req, res) => {
  try {
    const { userId, outfitId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { savedOutfits: outfitId } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Outfit saved", savedOutfits: user.savedOutfits });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to save outfit", error: err.message });
  }
});

// Unsave outfit
router.post("/users/:userId/unsave/:outfitId", async (req, res) => {
  try {
    const { userId, outfitId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { savedOutfits: outfitId } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Outfit unsaved", savedOutfits: user.savedOutfits });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to unsave outfit", error: err.message });
  }
});

// Get all saved outfits for a user (populated)
router.get("/users/:userId/saved-outfits", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("savedOutfits");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.savedOutfits);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch saved outfits", error: err.message });
  }
});

router.get("/test", (req, res) => res.send("Test route works!"));

// Curated (random) outfits
router.get("/outfits/curated", async (req, res) => {
  try {
    const curatedOutfits = await OutfitCard.aggregate([
      { $sample: { size: 8 } },
    ]);
    res.json(curatedOutfits);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch curated outfits", error: err.message });
  }
});

// Filtered outfits
router.get("/outfits/filtered", async (req, res) => {
  try {
    const { event, size, style } = req.query;
    const filter = {};
    if (event) filter.occasion = { $regex: new RegExp(event, "i") };
    if (size) filter.size = size;
    if (style) filter.style = { $regex: new RegExp(style, "i") };
    const outfits = await OutfitCard.find(filter);
    res.json(outfits);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch filtered outfits",
      error: err.message,
    });
  }
});

// Trending outfits route (Top N by likes)
router.get("/outfits/trending", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 3;
    const trendingOutfits = await OutfitCard.find()
      .sort({ likes: -1 })
      .limit(limit);
    res.json(trendingOutfits);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch trending outfits",
      error: err.message,
    });
  }
});
router.get("/garments", async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    const garments = await Garment.find(filter);
    res.json(garments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch garments", error: err.message });
  }
});

router.post("/created-outfits", async (req, res) => {
  try {
    const { user, mannequin, garments, garmentOrder } = req.body;
    if (!user || !mannequin || !garments) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    const createdOutfit = new CreatedOutfit({
      user,
      mannequin,
      garments,
      garmentOrder,
    });
    await createdOutfit.save();
    res
      .status(201)
      .json({ message: "Outfit added to collection", createdOutfit });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to save created outfit", error: err.message });
  }
});
// Fetch all created outfits for a user
router.get("/created-outfits/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const outfits = await CreatedOutfit.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.json(outfits);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch outfits", error: err.message });
  }
});

// Fetch multiple garments by IDs (helper route)
router.get("/garments/by-ids", async (req, res) => {
  try {
    const ids = req.query.ids ? req.query.ids.split(",") : [];
    if (!ids.length) return res.json([]);
    const garments = await Garment.find({ _id: { $in: ids } });
    res.json(garments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch garments", error: err.message });
  }
});
router.delete("/created-outfits/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await CreatedOutfit.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Outfit not found" });
    }
    res.json({ message: "Outfit removed" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to remove outfit", error: err.message });
  }
});
// Fetch all created outfits except by the current user, and populate user info
router.get("/created-outfits/community/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    // Optionally populate user info if ?populateUser=true
    const q = CreatedOutfit.find({ user: { $ne: userId } }).sort({
      createdAt: -1,
    });
    if (req.query.populateUser === "true")
      q.populate("user", "firstName lastName email");
    const outfits = await q.exec();
    res.json(outfits);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch community outfits",
      error: err.message,
    });
  }
});
// Return likes info for all community outfits, marking which ones the current user liked
router.get("/community-outfits/likes", async (req, res) => {
  const excludeUser = req.query.excludeUser;
  const outfits = await CreatedOutfit.find(
    { user: { $ne: excludeUser } },
    "_id likes"
  ); // likes = number or array depending on your schema
  // If you store a likedBy array, use that to determine if user liked each one
  // Otherwise, just return likes count and let frontend track if user liked it
  const result = {};
  outfits.forEach((o) => {
    result[o._id] = { count: o.likes || 0, likedByUser: false }; // fill likedByUser if you support it
  });
  res.json(result);
});

router.get("/search", async (req, res) => {
  try {
    const { q, type } = req.query;
    if (!q || q.trim() === "") return res.json({ results: [] });

    let results = [];

    // Search all types if not specified, otherwise filter
    if (!type || type === "all" || type === "outfits") {
      const outfits = await OutfitCard.find({
        title: { $regex: q, $options: "i" },
      }).limit(5);
      results = results.concat(
        outfits.map((x) => ({
          ...x.toObject(),
          type: "outfit",
          display: x.title,
        }))
      );
    }

    if (!type || type === "all" || type === "garments") {
      const garments = await Garment.find({
        name: { $regex: q, $options: "i" },
      }).limit(5);
      results = results.concat(
        garments.map((x) => ({
          ...x.toObject(),
          type: "garment",
          display: x.name,
        }))
      );
    }

    if (!type || type === "all" || type === "users") {
      const users = await User.find({
        $or: [
          { firstName: { $regex: q, $options: "i" } },
          { lastName: { $regex: q, $options: "i" } },
          { email: { $regex: q, $options: "i" } },
        ],
      }).limit(5);
      results = results.concat(
        users.map((x) => ({
          ...x.toObject(),
          type: "user",
          display: `${x.firstName || ""} ${x.lastName || ""}`.trim() || x.email,
        }))
      );
    }

    res.json({ results });
  } catch (err) {
    res.status(500).json({ message: "Failed to search", error: err.message });
  }
});

module.exports = router;
