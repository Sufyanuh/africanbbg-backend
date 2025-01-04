import jwt from "jsonwebtoken";
import { adminAuth } from "../models/auth.js";
const secertKey = "africanBBQ12345@12345";
export const generateAuthToken = (user = {}) => {
  const token = jwt.sign(user, secertKey);
  return token;
};

export const verifyToken = (token, type) => {
  try {
    const data =
      type === "admin"
        ? adminAuth.findOne({ token })
        : adminAuth.findOne({ token });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
