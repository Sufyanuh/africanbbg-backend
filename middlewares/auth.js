import { verifyToken } from "../services/generateJwt.js";

export const checkAuthToken = async (req, res, next) => {
  const type = req.baseUrl.includes("admin");
  // Extract token from the request header
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }
  const data = await verifyToken(token, type ? "admin" : "user");
  if (!data) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const newdata = data.toObject();
  delete newdata.token;
  delete newdata.password;
  req.user = newdata;
  next();
};
