import User from "../models/userModel.js";
import BaseRepository from "./BaseRepository.js";

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async getByUsername(username, select=null) {
        payload = {
            username: username
        };

        return await this.getOne(payload, select);
    }
    
    async getByEmail(email, select=null){
        payload = {
            email : email,
        };
        return await this.getOne(payload, select);
    }

    async createUser(payload) {
        const user = new this._model(payload);
        await this.save(user);
    }
}