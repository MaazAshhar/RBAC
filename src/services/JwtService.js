import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
dotenv.config();

export default class JwtService {
    SECRET_KEY = process.env.JWT_SECRET;
    DEFAULT_OPTION = {
        expiresIn: '1d',
    };

    constructor() {
    }

    parseToken(token){
        try {
            const decoded = jwt.verify(token, this.SECRET_KEY);
            return decoded;
        } catch (error) {
            console.error("error in decoding token",error);
            return null;
        }
    }

    generateToken(payload, options=this.DEFAULT_OPTION){
        try{
            const token = jwt.sign(payload, this.SECRET_KEY, options);
            if(token){
                return token;
            }
            return null;
        }catch(error){
            console.error("error in generating token",error);
            return null;
        }
        
    }
}