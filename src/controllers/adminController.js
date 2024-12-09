import AuthService from "../services/AuthService.js";
import UserService from "../services/UserService.js";


const userService = new UserService();
const authService = new AuthService();

export const createUser = async (req,res)=>{
    const { username, email, phone, password, role, fullName } = req.body;
  if (!username || !password || !email || !phone || ! fullName) {
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
    role: role
  };
  const userId = await authService.register(parsedUser);

  if (userId) {
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
}

export const deleteUser = async (req,res)=>{
    try{
        const {userId} = req.params;
        const user = await userService.deleteUserById(userId);
        if (user) {
            req.status(200).json(
                {
                    status: "success",
                    message: `User deleted with userId: ${userId}`
                }
            );
        }
    }catch(error){
        console.log("error in deleting user",error);
    }
    return res.status(500).json(
        {
            status : "failed",
            message : "Internal server error"
        }
    );
}

export const banOrUnbanUser = async (req,res)=>{
    try {
        const {userId, status} = req.body;
        const user = await userService.updateUserActiveStatus(userId, status);
        if (user) {
            req.status(200).json(
                {
                    status: "success",
                    message: `User active status updated with userId: ${userId}`
                }
            );
        }
    } catch (error) {
        console.log("error in banning user",error);
    }
    return res.status(500).json(
        {
            status : "failed",
            message : "Internal server error"
        }
    );
}

export const promoteUser = async (req,res)=>{
    try {
        const { userId, role } = req.body;
        const user = await userService.updateUserRole(userId, role);
        if (user) {
            req.status(200).json(
                {
                    status: "success",
                    message: `User's role updated with userId: ${userId}`
                }
            );
        }
    } catch (error) {
        console.log("error in promoting user",error);
    }
    return res.status(500).json(
        {
            status : "failed",
            message : "Internal server error"
        }
    );
}

export const getAllUser = async(req,res)=>{
    try {
        const users = await userService.getAllUsers();
        if (users) {
            req.status(200).json(
                {
                    status: "success",
                    users: users
                }
            );
        }
    } catch (error) {
        console.log("error in getting users",error);
    }
    return res.status(500).json(
        {
            status : "failed",
            message : "Internal server error"
        }
    );
}