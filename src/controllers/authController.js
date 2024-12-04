import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import AuthService from '../services/AuthService.js';



const authService = new AuthService();

export const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const [user, token, error] = await authService.login(username, email, password);
    if(user && token){
        return res.status(200).json({status : "success", user, token});
    }else{
        if(error){
            return res.status(error.status).json({status : "failed", message : error.message});
        }else{
            return res.status(400).json({status : "failed", message : "Invalid credentials"});
        }
    }
  } catch (error) {
    console.log("error in login", error);
    return res.status(500).json({message : "Internal server error"});
  }
};




export const register = async (req, res) => {
  const { username, email, phone, password } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json(
      { 
        status : "failed",
        error: "Username, email or Password can't be empty" 
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
        status : "success",
        message: "user registered successfully" 
      }
    );
  }
  return res.status(500).json(
    { 
        status : "failed",
      error: "Internal server error" 
    }
  );
};
