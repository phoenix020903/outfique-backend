require("dotenv").config();
const mongoose = require("mongoose");
const OutfitCard = require("../models/OutfitCard");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 25 thoughtfully named, occasion-style matched outfits with reliable images (Unsplash, Pexels, Pixabay, Burst, etc.)
const outfits = [
  {
    name: "Confident Interview Suit",
    image:
      "https://i.shgcdn.com/9d341fbb-1125-4b1e-968e-bf1f9c45416e/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
    items: [
      { name: "Navy Suit", brand: "Raymond" },
      { name: "Oxford Shoes", brand: "Bata" },
    ],
    occasion: "Interview",
    likes: 14,
    size: "L",
    style: "Formals",
  },
  {
    name: "Boardroom Ready",
    image:
      "https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&w=500&q=80",
    items: [
      { name: "Grey Blazer", brand: "Van Heusen" },
      { name: "Formal Trousers", brand: "Allen Solly" },
    ],
    occasion: "Interview",
    likes: 11,
    size: "M",
    style: "Formals",
  },
  {
    name: "Dance Floor Queen",
    image:
      "https://images.pexels.com/photos/415318/pexels-photo-415318.jpeg?auto=compress&w=500&q=80",
    items: [
      { name: "Sequined Dress", brand: "Zara" },
      { name: "Heels", brand: "Steve Madden" },
    ],
    occasion: "Party",
    likes: 22,
    size: "S",
    style: "Streetwear",
  },
  {
    name: "Neon Night Out",
    image:
      "https://images.pexels.com/photos/2179218/pexels-photo-2179218.jpeg?auto=compress&w=500&q=80",
    items: [
      { name: "Neon Crop Top", brand: "H&M" },
      { name: "Leather Skirt", brand: "Forever 21" },
    ],
    occasion: "Party",
    likes: 19,
    size: "M",
    style: "Streetwear",
  },
  {
    name: "Romantic Red",
    image:
      "https://images.pexels.com/photos/1138903/pexels-photo-1138903.jpeg?auto=compress&w=500&q=80",
    items: [
      { name: "Red Dress", brand: "Mango" },
      { name: "Pumps", brand: "Charles & Keith" },
    ],
    occasion: "Date Night",
    likes: 18,
    size: "XS",
    style: "Minimalist",
  },
  {
    name: "Chic Candlelight",
    image:
      "https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&w=500&q=80",
    items: [
      { name: "Black Off-Shoulder Top", brand: "Zara" },
      { name: "Skinny Jeans", brand: "Levis" },
    ],
    occasion: "Date Night",
    likes: 15,
    size: "M",
    style: "Casual",
  },
  {
    name: "Laidback Explorer",
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=500&q=80",
    items: [
      { name: "Denim Jacket", brand: "Levis" },
      { name: "Sneakers", brand: "Nike" },
    ],
    occasion: "Travel",
    likes: 23,
    size: "L",
    style: "Streetwear",
  },
  {
    name: "Airport Athleisure",
    image:
      "https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg?auto=compress&w=500&q=80",
    items: [
      { name: "Oversized Hoodie", brand: "Adidas" },
      { name: "Joggers", brand: "Puma" },
    ],
    occasion: "Travel",
    likes: 20,
    size: "M",
    style: "Sporty",
  },
  {
    name: "Classic Office Attire",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=500&q=80",
    items: [
      { name: "White Shirt", brand: "Uniqlo" },
      { name: "Black Trousers", brand: "H&M" },
    ],
    occasion: "Office",
    likes: 12,
    size: "M",
    style: "Minimalist",
  },
  {
    name: "Casual Friday",
    image:
      "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&w=500&q=80",
    items: [
      { name: "Plaid Shirt", brand: "Levis" },
      { name: "Dark Jeans", brand: "Wrangler" },
    ],
    occasion: "Office",
    likes: 14,
    size: "XL",
    style: "Casual",
  },
  {
    name: "Boho Brunch",
    image:
      "https://images.pexels.com/photos/1136741/pexels-photo-1136741.jpeg?auto=compress&w=500&q=80",
    items: [
      { name: "Floral Maxi Dress", brand: "Global Desi" },
      { name: "Strappy Sandals", brand: "Aldo" },
    ],
    occasion: "Casual Outing",
    likes: 21,
    size: "M",
    style: "Vintage",
  },
  {
    name: "Minimalist Walk",
    image:
      "https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&w=500&q=80",
    items: [
      { name: "Beige Top", brand: "Uniqlo" },
      { name: "White Culottes", brand: "H&M" },
    ],
    occasion: "Casual Outing",
    likes: 13,
    size: "S",
    style: "Minimalist",
  },
  {
    name: "Ethnic Grace",
    image:
      "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&w=500&q=80",
    items: [
      { name: "Kurti", brand: "Fabindia" },
      { name: "Leggings", brand: "Biba" },
    ],
    occasion: "Wedding",
    likes: 24,
    size: "M",
    style: "Ethnic",
  },
  {
    name: "Grand Baraat",
    image:
      "https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&w=500&q=80",
    items: [
      { name: "Sherwani", brand: "Manyavar" },
      { name: "Mojari", brand: "Manyavar" },
    ],
    occasion: "Wedding",
    likes: 19,
    size: "L",
    style: "Ethnic",
  },
  {
    name: "Sangeet Chic",
    image:
      "https://cdn.pixabay.com/photo/2016/11/29/07/19/woman-1867093_1280.jpg",
    items: [
      { name: "Lehenga", brand: "Ritu Kumar" },
      { name: "Juttis", brand: "Fizzy Goblet" },
    ],
    occasion: "Wedding",
    likes: 18,
    size: "XS",
    style: "Ethnic",
  },
  {
    name: "Vintage Summer",
    image:
      "https://images.pexels.com/photos/1138336/pexels-photo-1138336.jpeg?auto=compress&w=500&q=80",
    items: [
      { name: "Polka Dot Dress", brand: "Forever 21" },
      { name: "Ballet Flats", brand: "Aldo" },
    ],
    occasion: "Casual Outing",
    likes: 16,
    size: "M",
    style: "Vintage",
  },
  {
    name: "Retro Roadtrip",
    image:
      "https://cdn.pixabay.com/photo/2017/08/06/06/45/people-2588594_1280.jpg",
    items: [
      { name: "Denim Overalls", brand: "Levis" },
      { name: "Sneakers", brand: "Converse" },
    ],
    occasion: "Travel",
    likes: 15,
    size: "L",
    style: "Vintage",
  },
  {
    name: "Sporty Weekend",
    image:
      "https://images.pexels.com/photos/3768918/pexels-photo-3768918.jpeg?auto=compress&w=500&q=80",
    items: [
      { name: "Sports Bra", brand: "Nike" },
      { name: "Running Shorts", brand: "Adidas" },
    ],
    occasion: "Travel",
    likes: 21,
    size: "S",
    style: "Sporty",
  },
  {
    name: "Comfy Gym Look",
    image:
      "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&w=500&q=80",
    items: [
      { name: "Track Jacket", brand: "Puma" },
      { name: "Joggers", brand: "Decathlon" },
    ],
    occasion: "Casual Outing",
    likes: 17,
    size: "M",
    style: "Sporty",
  },
  {
    name: "Wedding Regal",
    image:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/adult-1867021_1280.jpg",
    items: [
      { name: "Classic Saree", brand: "Biba" },
      { name: "Heels", brand: "Metro" },
    ],
    occasion: "Wedding",
    likes: 27,
    size: "L",
    style: "Ethnic",
  },
  {
    name: "Street Style Star",
    image:
      "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&w=500&q=80",
    items: [
      { name: "Graphic Tee", brand: "H&M" },
      { name: "Cargo Pants", brand: "Roadster" },
    ],
    occasion: "Casual Outing",
    likes: 16,
    size: "S",
    style: "Streetwear",
  },
  {
    name: "Urban Explorer",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80",
    items: [
      { name: "Bomber Jacket", brand: "Zara" },
      { name: "Skinny Jeans", brand: "Levis" },
    ],
    occasion: "Travel",
    likes: 18,
    size: "M",
    style: "Streetwear",
  },
  {
    name: "Wedding Blossom",
    image:
      "https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&w=500&q=80",
    items: [
      { name: "Anarkali Dress", brand: "FabAlley" },
      { name: "Kolhapuri Sandals", brand: "Bata" },
    ],
    occasion: "Wedding",
    likes: 22,
    size: "XL",
    style: "Ethnic",
  },
  {
    name: "Sunny Picnic",
    image:
      "https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&w=500&q=80",
    items: [
      { name: "Yellow Sundress", brand: "Mango" },
      { name: "White Sneakers", brand: "Puma" },
    ],
    occasion: "Casual Outing",
    likes: 23,
    size: "L",
    style: "Casual",
  },
  {
    name: "Office Minimal",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=500&q=80",
    items: [
      { name: "Beige Blouse", brand: "Uniqlo" },
      { name: "Grey Pencil Skirt", brand: "Zara" },
    ],
    occasion: "Office",
    likes: 11,
    size: "M",
    style: "Minimalist",
  },
];

OutfitCard.insertMany(outfits)
  .then(() => {
    console.log("Outfit seed successful!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Seed failed:", err);
    mongoose.connection.close();
  });
