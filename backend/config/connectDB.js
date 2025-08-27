import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb  connected successfully");
  } catch (error) {
    console.error("database conection failed:", error.message);
    process.exit(1);
  }
};
