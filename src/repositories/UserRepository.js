import User from "../models/userModel.js";
import BaseRepository from "./BaseRepository.js";

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async getByUsername(username) {
        payload = {
            username: username
        };

        return await this.getOne(payload);
    }

    async createUser(payload) {
        const user = new this._model(payload);
        await this.save(user);
    }
}