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
            return res.status(error.status).json({status : "failed", error : error.message});
        }else{
            return res.status(400).json({status : "failed", error : "Something went wrong try again"});
        }
    }
  } catch (error) {
    console.log("error in login", error);
    return res.status(500).json({status : "failed", error : "Internal server error"});
  }
};




export const register = async (req, res) => {
  const { username, email, phone, password, fullName } = req.body;
  if (!username || !password || !email || !phone || !fullName) {
    return res.status(400).json(
      { 
        status : "failed",
        error: "Username, email, phone Password and fullName can't be empty" 
      }
    );
  }else if(password.length < 6){
    return res.status(400).json({status : "failed", error : "password must be at least 6 characters long"});
  }


  const parsedUser = {
    username: username,
    email: email,
    phone: phone,
    password: password,
    fullName,
  };
  const [done, error, userId] = await authService.register(parsedUser);
  if(error){
    return res.status(error.status).json({status : "failed", error : error.message});
  }
  if (done) {
    return res.status(201).json(
      { 
        status : "success",
        message: "user registered successfully",
        userId: userId
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


export const changePassword = async (req,res)=>{
    try {
        const {oldPassword, newPassword, confirmNewPassword, userId} = req.body;
        if(userId.toString() !== req.user?.id.toString()){
            return res.status(401).json({status : "failed", error: "Unauthorized"});
        }
        const [done, error] = await authService.changePassword(oldPassword, newPassword, confirmNewPassword, userId);
        if(error){
            return res.status(error.status).json({status : "failed", error : error.message});
        }
        else if(done){
            return res.status(200).json({status : "success", message : "password changed successfully"});
        }
        return res.status(500).json({status : "failed", error : "something went wrong, try again !!!"});

    } catch (error) {
        console.error("error in changing password",error);
        return res.status(500).json({status : "failed", message : "Internal server error"});
    }
}
