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

        const users = this.query(payload);
        let user = null;
        for(let u of users) {
            user = u;
            break;
        }
        return user;
    }
}