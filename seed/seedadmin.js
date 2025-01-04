import bcrypt from "bcryptjs";
import { adminAuth } from "../models/auth.js";

const seedAdmin = async () => {
  try {
    const adminExists = await adminAuth.findOne({ email: "admin@gmail.com" });

    if (adminExists) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("12345678", 10);

    const newAdmin = new adminAuth({
      name: "admin",
      email: "admin@gmail.com",
      password: hashedPassword, // Save the hashed password
      token: null,
    });

    await newAdmin.save();
    console.log("Default admin created successfully!");
  } catch (error) {
    console.error("Error seeding admin:", error);
  }
};

export default seedAdmin;
