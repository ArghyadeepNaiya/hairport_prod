const mongoose = require("mongoose");

// Support both standard MONGO_url and Vercel's auto-injected MONGODB_URI
const MONGO_url = process.env.MONGO_url || process.env.MONGODB_URI;

// Vercel Serverless Connection Caching
// This prevents Vercel from opening too many connections and timing out
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const databaseConnect = async () => {
  if (!MONGO_url) {
    console.error("ERROR: No MongoDB URL found! Please add MONGO_url to your Vercel Environment Variables.");
    return null;
  }

  // If a connection is already active in this Vercel function, reuse it!
  if (cached.conn) {
    console.log("Using cached database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Establishing new database connection...");
    
    // Disable buffering. If the DB isn't connected, it will fail immediately instead of timing out after 10000ms
    const opts = {
      serverSelectionTimeoutMS: 5000 
    };

    cached.promise = mongoose.connect(MONGO_url, opts).then((mongoose) => {
      console.log("Database connected successfully!");
      return mongoose;
    }).catch(err => {
      console.error("Database connection error:", err);
      throw err;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error(e);
  }

  return cached.conn;
};

module.exports = databaseConnect;
