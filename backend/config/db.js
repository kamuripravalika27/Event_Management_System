const mongoose = require('mongoose');

let isInMemoryMode = false;

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/event_management';
    console.log(`Connecting to MongoDB at: ${connStr}...`);
    
    // Set short timeout for quick fallback if local MongoDB server is not running
    await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000
    });
    
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
    return false;
  } catch (error) {
    console.warn(`⚠️ Local MongoDB connection failed (${error.message}).`);
    console.log(`🚀 Switching to High-Performance In-Memory DB Mode for instant seamless operation!`);
    isInMemoryMode = true;
    return true;
  }
};

const getIsInMemoryMode = () => isInMemoryMode;

module.exports = { connectDB, getIsInMemoryMode };
