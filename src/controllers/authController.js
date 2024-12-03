import bcrypt from "bcrypt";
import User from "../models/userModel.js";

export const login = async (req, res) => {
  try {
    res.status(200).json({ message: "welcome to login" });
    const { username, email, password } = req.body;
    if (username) {
      const user = await User.findOne({ username: username });
      if (!user) {
        return res.status(400).json({ message: "user not found" });
      }
      if (await bcrypt.compare(password, user.password)) {
      }
    }
  } catch (error) {
    console.log("error in login", error);
    return res.status(500).json({message : "Internal server error"});
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const newPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, newPassword, phone });
    await user.save();
    return res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    console.log("error in registering user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
