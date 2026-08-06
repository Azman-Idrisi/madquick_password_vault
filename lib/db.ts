import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) throw new Error("Missing MONGO_URI");

let cached = globalThis as any;
if (!cached.mongoose) cached.mongoose = { conn: null, promise: null };

async function connect() {
  if (cached.mongoose.conn) return cached.mongoose.conn;
  if (!cached.mongoose.promise) {
    cached.mongoose.promise = mongoose.connect(MONGO_URI).then(m => m);
  }
  cached.mongoose.conn = await cached.mongoose.promise;
  return cached.mongoose.conn;
}

export default connect;
