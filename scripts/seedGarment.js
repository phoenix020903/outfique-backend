require("dotenv").config();
const mongoose = require("mongoose");
const Garment = require("../models/Garment");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const garments = [
  // Tops (10)
  {
    name: "Classic White T-Shirt",
    type: "top",
    image: "/assets/WhiteTshirt.png",
  },
  {
    name: "Blue Denim Shirt",
    type: "top",
    image:
      "https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Black Hoodie",
    type: "top",
    image:
      "https://images.pexels.com/photos/1004016/pexels-photo-1004016.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Red Flannel Shirt",
    type: "top",
    image:
      "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Striped Polo",
    type: "top",
    image:
      "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Grey Sweatshirt",
    type: "top",
    image:
      "https://images.pexels.com/photos/1820875/pexels-photo-1820875.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Green Crop Top",
    type: "top",
    image:
      "https://images.pexels.com/photos/936119/pexels-photo-936119.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Yellow Tank Top",
    type: "top",
    image:
      "https://images.pexels.com/photos/1138903/pexels-photo-1138903.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Beige Cardigan",
    type: "top",
    image:
      "https://images.pexels.com/photos/2983463/pexels-photo-2983463.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Navy Blue Blazer",
    type: "top",
    image:
      "https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&w=400&q=80",
  },
  // Bottoms (10)
  {
    name: "Blue Jeans",
    type: "bottom",
    image: "/assets/BlueJean.png",
  },
  {
    name: "Red Skirt",
    type: "bottom",
    image:
      "https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Black Trousers",
    type: "bottom",
    image:
      "https://images.pexels.com/photos/404168/pexels-photo-404168.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "White Shorts",
    type: "bottom",
    image:
      "https://images.pexels.com/photos/1462633/pexels-photo-1462633.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Green Chinos",
    type: "bottom",
    image:
      "https://images.pexels.com/photos/2983462/pexels-photo-2983462.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Blue Culottes",
    type: "bottom",
    image:
      "https://images.pexels.com/photos/1138902/pexels-photo-1138902.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Grey Joggers",
    type: "bottom",
    image:
      "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Black Leggings",
    type: "bottom",
    image:
      "https://images.pexels.com/photos/373956/pexels-photo-373956.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Brown Corduroy Pants",
    type: "bottom",
    image:
      "https://images.pexels.com/photos/2834914/pexels-photo-2834914.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Yellow Palazzo",
    type: "bottom",
    image:
      "https://images.pexels.com/photos/2100064/pexels-photo-2100064.jpeg?auto=compress&w=400&q=80",
  },
  // Shoes (5)
  {
    name: "White Sneakers",
    type: "shoes",
    image:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Brown Leather Boots",
    type: "shoes",
    image:
      "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Black Loafers",
    type: "shoes",
    image:
      "https://images.pexels.com/photos/2983465/pexels-photo-2983465.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Red Heels",
    type: "shoes",
    image:
      "https://images.pexels.com/photos/167703/pexels-photo-167703.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Blue Flip Flops",
    type: "shoes",
    image:
      "https://images.pexels.com/photos/365167/pexels-photo-365167.jpeg?auto=compress&w=400&q=80",
  },
  // Accessories (8)
  {
    name: "Black Sunglasses",
    type: "accessory",
    image:
      "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Blue Cap",
    type: "accessory",
    image:
      "https://images.pexels.com/photos/936119/pexels-photo-936119.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Leather Belt",
    type: "accessory",
    image:
      "https://images.pexels.com/photos/2983467/pexels-photo-2983467.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Red Scarf",
    type: "accessory",
    image:
      "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Silver Watch",
    type: "accessory",
    image:
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Golden Necklace",
    type: "accessory",
    image:
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "Black Backpack",
    type: "accessory",
    image:
      "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&w=400&q=80",
  },
  {
    name: "White Handbag",
    type: "accessory",
    image:
      "https://images.pexels.com/photos/2983468/pexels-photo-2983468.jpeg?auto=compress&w=400&q=80",
  },
  // Mannequins (5)
  {
    name: "Standard Female",
    type: "mannequin",
    image: "https://pngimg.com/uploads/mannequin/mannequin_PNG61.png",
  },
  {
    name: "Standard Male",
    type: "mannequin",
    image: "/assets/Mannequin3.png",
  },
  {
    name: "Athletic Female",
    type: "mannequin",
    image: "https://pngimg.com/uploads/mannequin/mannequin_PNG110.png",
  },
  {
    name: "Athletic Male",
    type: "mannequin",
    image: "https://pngimg.com/uploads/mannequin/mannequin_PNG60.png",
  },
  {
    name: "Display Mannequin",
    type: "mannequin",
    image: "https://pngimg.com/uploads/mannequin/mannequin_PNG108.png",
  },
];

Garment.insertMany(garments)
  .then(() => {
    console.log("Garment seed successful!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Garment seed failed:", err);
    mongoose.connection.close();
  });
