import User from "../models/userModel.js";
import BaseRepository from "./BaseRepository.js";

export default class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async getByUsername(username, select=null) {
        const payload = {
            username: username
        };

        return await this.getOne(payload, select);
    }
    
    async getByEmail(email, select=null){
        const payload = {
            email : email,
        };
        return await this.getOne(payload, select);
    }

    async createUser(payload) {
        const user = new this._model(payload);
        return await this.save(user);
    }
}