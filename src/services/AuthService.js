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
        if(username && password){
            user = await this.userRepository.getByUsername(username);
            if(!user){
                token = null;
                error = {
                    status: 404,
                    message: "User not found"
                };
            }else{
                if(await bcrypt.compare(password, user.password)){
                    const payload = {
                        id : user._id,
                        role : user.role,
                    }
                    token = this.jwtService.generateToken(payload);
                }else{
                    token = null;
                    error = {
                        status: 401,
                        message : "Invalid credentials",
                    }
                }
            }         
        } else if (email && password) {
            user = await this.userRepository.getByEmail(email);
            if (!user) {
                token = null;
                error = {
                    status: 404,
                    message: "User not found"
                };
            }else{
                if(await bcrypt.compare(password, user.password)){
                    const payload = {
                        id : user._id,
                        role : user.role,
                    }
                    token = this.jwtService.generateToken(payload);
                }else{
                    token = null;
                    error = {
                        status: 401,
                        message : "Invalid credentials",
                    }
                }
            }
        } else {
            error = {
                status: 400,
                message: "Please provide required input"
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
        try {
            const hashPassword = await bcrypt.hash(parsedUser.password, this.HASH_SALT);
            const userPayload = {
                ...parsedUser,
                password: hashPassword
            };
    
            const user = await this.userRepository.createUser(userPayload);
            return user.id;
        } catch (error) {
            console.error(error);
            return false;
        }
    }


    async changePassword(oldPassword, newPassword, confirmNewPassword, userId){
        let error = null;
        let done = null;
        try{
            if(!oldPassword || !newPassword || !confirmNewPassword || ! userId){
                error = {
                    status : 400,
                    message : "Please provide all required input",
                }
            }
            else if(newPassword !== confirmNewPassword){
               error = {
                status : 400,
                message : "Passwords do not match",
               } 
            }
            
        }catch(error){
            console.error("something went wrong in changing password",error);
            error = {
                status : 500,
                message : "Internal server error",
            }
            done=false;
            return [done, error];
        }
    }
}