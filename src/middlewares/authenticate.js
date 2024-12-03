import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
dotenv.config();
// this will authnticate the user whether user have token or not
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming 'Bearer <token>'
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};
