import dotenv from "dotenv";
import UserRepository from "../repositories/UserRepository.js";
import AuthService from "../services/AuthService.js";
dotenv.config();
const userRepository = new UserRepository();
const authService = new AuthService();
const createAdmin = async () => {
  try {
    const username = process.env.ADMIN_USERNAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const phone = process.env.ADMIN_PHONE;
    const fullName = process.env.ADMIN_FULLNAME;
    if(!username || !email || !password || !phone || !fullName){
        console.log("Please write all the necessary variables in .env file. Please refer to Readme file to set up admin account");
        throw Error('Please write all the necessary variables in .env file. Please refer to Readme file to set up admin account');
    }
    const user = await userRepository.getByUsername(username);
    if (user) {
      console.log("admin is already set up");
      return;
    }
    const parsedUser = {
      username,
      email,
      password,
      phone,
      fullName,
      role : 'admin',
    };
    const userId = await authService.register(parsedUser);
    if (userId) {
      console.log("admin account is set up successfully");
      return;
    } else {
      console.log("failed to set up admin account");
    }
  } catch (error) {
    console.error("error in setting up admin account", error);
  }
};

export default createAdmin;
