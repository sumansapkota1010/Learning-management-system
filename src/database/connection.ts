import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("You must provide connection string ");
}

const connectDb = async () => {
  console.log(mongoose.connection.readyState);
  if (mongoose.connection.readyState == 1) {
    console.log("Database already connected");
    return;
  }
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.log("Error in connecting:", error);
  }
};

export default connectDb;
