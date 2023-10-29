import mongoose from "mongoose";
require("dotenv").config();

const dbUrl = process.env.DB_URL || "";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useUnifiedTopology: true,
    });

    console.log("Database connected");
  } catch (error) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
