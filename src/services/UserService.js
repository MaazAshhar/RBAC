import UserRepository from "../repositories/UserRepository.js";


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

    async updateUserById(userId,payload){
        return await this.userRepository.updateOne({_id : userId},payload);
    }

    async getUserById(userId){
        let user=null;
        let error=null;
        user=await this.userRepository.getOne({_id : userId},'-password');
        if(!user){
            error={
                status : 404,
                message : "user not found",
            }
        }
        return [user, error];
    }
}