// Run with: node seed.js
const mongoose = require("mongoose");
const Product = require("./models/products");
const Category = require("./models/categories");
require("dotenv").config();

// Connect to Atlas
const DB_URI = "mongodb+srv://user_id:user_password@cluster1.biu6bh6.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const categories = [
  {
    name: "Cricket",
    description: "Professional cricket equipment.",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80",
    items: ["Bat", "Ball", "Gloves", "Pads"],
    adjectives: ["Pro", "Elite", "Classic"]
  },
  {
    name: "Football",
    description: "FIFA quality football gear.",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
    items: ["Football", "Studs", "Jersey"],
    adjectives: ["Striker", "League", "Precision"]
  },
  {
    name: "Badminton",
    description: "Rackets and shuttlecocks.",
    image: "https://images.unsplash.com/photo-1626224583764-84786c71971e?auto=format&fit=crop&w=800&q=80",
    items: ["Racket", "Shuttlecock", "Net"],
    adjectives: ["Smash", "Aero", "Pro"]
  },
  {
    name: "Tennis",
    description: "Grand slam gear.",
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80",
    items: ["Racket", "Ball", "Headband"],
    adjectives: ["Ace", "Court", "Spin"]
  },
  {
    name: "Fitness",
    description: "Gym equipment.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    items: ["Dumbbell", "Mat", "Shaker"],
    adjectives: ["Iron", "Flex", "Core"]
  }
];

const seedData = async () => {
  try {
    console.log("🌱 Connecting to MongoDB Atlas...");
    
    // 1. DELETE OLD DATA (This wipes the 100+ items)
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log("🧹 Cleared old Categories and Products.");

    let productsToInsert = [];

    for (const catData of categories) {
      const newCategory = await new Category({
        cName: catData.name,
        cDescription: catData.description,
        cImage: catData.image,
        cStatus: "Active",
      }).save();

      console.log(`✅ Created Category: ${catData.name}`);

      for (const item of catData.items) {
        for (const adj of catData.adjectives) {
          productsToInsert.push({
            pName: `${adj} ${item}`,
            pDescription: `High quality ${adj} ${item} for professionals.`,
            pPrice: Math.floor(Math.random() * 2000) + 500,
            pQuantity: 10,
            pCategory: newCategory._id,
            pImages: [catData.image],
            pOffer: 10,
            pStatus: "Active",
          });
        }
      }
    }

    // 2. SHUFFLE AND CUT TO 20
    productsToInsert.sort(() => Math.random() - 0.5);
    const final20 = productsToInsert.slice(0, 20); // <--- THIS LIMITS IT TO 20

    if (final20.length > 0) {
      await Product.insertMany(final20);
      console.log(`🚀 Successfully added ${final20.length} Unique Products!`);
    }

    console.log("👋 Seeding Complete. Exiting...");
    process.exit();

  } catch (error) {
    console.log("❌ Error:", error);
    process.exit(1);
  }
};

seedData();
