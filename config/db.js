const mongoose = require("mongoose");

// Reuse one connection across requests (important for serverless hosting)
let cached = global._mongoose || (global._mongoose = { conn: null, promise: null });

const connectDB = async () => {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI).then((m) => {
      console.log(`MongoDB Connected: ${m.connection.host}`);
      return m;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error(`DB Error: ${error.message}`);
    throw error;
  }
  return cached.conn;
};

module.exports = connectDB;
