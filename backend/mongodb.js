import mongoose from "mongoose";

async function mongodb_connection(database_name) {
  try {
    // ✅ Use environment variable, fallback to local MongoDB
    const mongoURI = process.env.MONGODB_URI || `${process.env.MONGODB_PATH || 'mongodb://127.0.0.1:27017/'}${database_name}`;
    await mongoose.connect(mongoURI);
    console.log(`MongoDB connected successfully to ${database_name}`);
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
}

export default mongodb_connection;