import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import AuthService from '../services/AuthService.js';



const authService = new AuthService();

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
  const { username, email, phone, password } = req.body;
  if (!username || !password) {
    return res.status(400).json(
      { 
        error: "Username or Password can't be empty" 
      }
    );
  }


  const parsedUser = {
    username: username,
    email: email,
    phone: phone,
    password: password
  };
  const isRegistered = await authService.register(parsedUser);

  if (isRegistered) {
    return res.status(201).json(
      { 
        message: "user registered successfully" 
      }
    );
  }
  return res.status(500).json(
    { 
      error: "Internal server error" 
    }
  );
};
