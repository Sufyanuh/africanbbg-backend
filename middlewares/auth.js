import { verifyToken } from "../services/generateJwt.js";

export const checkAuthToken = async (req, res, next) => {
  // Extract token from the request header
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }
  const user = await verifyToken(token, "admin");
  if (!user) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const newUser = user.toObject();
  delete newUser.token;
  delete newUser.password;
  req.user = newUser;
  next();
};
