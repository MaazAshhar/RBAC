import UserRepository from "../repositories/UserRepository";


export default class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }


    async getAllUsers(){
        const users = await this.userRepository.getAllUsers('-password');
        return users;
    }

    async deleteUserById(userId){
        return await this.userRepository.deleteOne({_id : userId});
    }
}