import mongoose from "mongoose";
import userModel from "./models/userModel.js";

const MONGO_URI = "mongodb+srv://manishkag74402:7772832545@internitshop.duhbr4e.mongodb.net";

async function seed() {
  await mongoose.connect(MONGO_URI);

  const user = await userModel.findById("6854d7b3ba8b4e7e26c25664");
  if (!user) {
    await userModel.create({
      _id: "6854d7b3ba8b4e7e26c25664",
      name: "Test Seller",
      email: "seller@example.com",
      password: "testpassword",
      phone: "9876543210"
    });
    console.log("Test user created.");
  } else {
    console.log("Test user already exists.");
  }
  mongoose.disconnect();
}

seed();
