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
                username: parsedUser.username,
                email: parsedUser.email,
                phone: parsedUser.phone,
                password: hashPassword
            };
    
            await this.userRepository.createUser(userPayload);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}