import bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository.js';
import JwtService from "./JwtService.js";


export default class AuthService {
  HASH_SALT = 10;

  constructor() {
    this.userRepository = new UserRepository();
    this.jwtService = new JwtService();
  }

  async login(username, email, password) {
    let user = null;
    let token = null;
    let error = null;
    if (username && password) {
      user = await this.userRepository.getByUsername(username);
      if (!user) {
        token = null;
        error = {
          status: 404,
          message: "User not found",
        };
      } else {
        if (!user.isActive) {
          token = null;
          user = null;
          error = {
            status: 401,
            message: "your account is suspended",
          };
          return [user, token, error];
        }
        if (await bcrypt.compare(password, user.password)) {
          const payload = {
            id: user._id,
            role: user.role,
          };
          token = this.jwtService.generateToken(payload);
        } else {
          token = null;
          error = {
            status: 401,
            message: "Invalid credentials",
          };
        }
      }
    } else if (email && password) {
      user = await this.userRepository.getByEmail(email);
      if (!user) {
        token = null;
        error = {
          status: 404,
          message: "User not found",
        };
      } else {
        if (!user.isActive) {
          token = null;
          user = null;
          error = {
            status: 401,
            message: "your account is suspended",
          };
          return [user, token, error];
        }
        if (await bcrypt.compare(password, user.password)) {
          const payload = {
            id: user._id,
            role: user.role,
          };
          token = this.jwtService.generateToken(payload);
        } else {
          token = null;
          error = {
            status: 401,
            message: "Invalid credentials",
          };
        }
      }
    } else {
      error = {
        status: 400,
        message: "Please provide required input",
      };
    }

    return [user, token, error];
  }

  /**
   *
   * @param {Object} parsedUser - User payload to create a new user entity in DB
   * @returns {boolean} - true if successfully create a user otherwise false
   */
  async register(parsedUser) {
    let done = null;
    let error = null;
    let userId = null;
    try {
      const hashPassword = await bcrypt.hash(
        parsedUser.password,
        this.HASH_SALT
      );
      const userPayload = {
        ...parsedUser,
        password: hashPassword,
      };

      const user = await this.userRepository.createUser(userPayload);
      if(user){
        done = true;
        error = null;
        userId = user._id;
      }
      return [done, error, userId];
    } catch (error) {
      console.error(error);
      if(error.code === 11000){
        done = false;
        error = {
            status: 400,
            message : "user already exist",
        }
        return [done, error];
      }
      done = false;
      error = {
        status : 500,
        message : "Internal server error",
      }
      return [done, error];
    }
  }

  async changePassword(oldPassword, newPassword, confirmNewPassword, userId) {
    let error = null;
    let done = null;
    try {
      if (!oldPassword || !newPassword || !confirmNewPassword || !userId) {
        error = {
          status: 400,
          message: "Please provide all required input",
        };
      } else {
        const getUser = await this.userRepository.getById(userId);
        if (!getUser) {
          error = {
            status: 404,
            message: "user not found",
          };
          return [done, error];
        } else if (!(await bcrypt.compare(oldPassword, getUser.password))) {
          error = {
            status: 400,
            message: "incorrect password",
          };
          return [done, error];
        }
      }
      if (newPassword !== confirmNewPassword) {
        error = {
          status: 400,
          message: "Passwords do not match",
        };
      } else {
        const updatedPassword = await bcrypt.hash(newPassword, this.HASH_SALT);
        const user = await this.userRepository.updateById(userId, {
          password: updatedPassword,
        });
        if (user) {
          done = true;
          error = null;
        } else {
          error = {
            status: 500,
            message: "Passwords do not match",
          };
        }
      }
      return [done, error];
    } catch (error) {
      console.error("something went wrong in changing password", error);
      error = {
        status: 500,
        message: "Internal server error",
      };
      done = false;
      return [done, error];
    }
  }
}