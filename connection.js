import { connect } from "mongoose";

export const ConnectMongoDB = async () => {
  // Replace with your MongoDB connection string
  const uri =
    "mongodb+srv://project-01:a9HfI0qDMJ6Twevr@cluster0.62rdr.mongodb.net/africanbq";
  try {
    await connect(uri);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
