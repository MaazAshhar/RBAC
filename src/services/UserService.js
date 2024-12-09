import UserRepository from "../repositories/UserRepository.js";


export default class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }


    async getAllUsers(){
        const users = await this.userRepository.getAll('-password');
        return users;
    }

    async deleteUserById(userId){
        return await this.userRepository.deleteOne({_id : userId});
    }

    async updateUserById(userId,payload){
        return await this.userRepository.updateOne({_id : userId},payload);
    }

    async getUserById(userId){
        let error=null;
        const user = await this.userRepository.getById(userId, '-password');
        if(!user){
            error={
                status : 404,
                message : "user not found",
            }
        }
        return [user, error];
    }

    async updateUserActiveStatus(id, status) {
        try {
            const user = await this.userRepository.updateById(
                id,
                {
                    isActive: status
                }
            );
            return user;
        } catch (error) {
            console.log(`Error in updating active status of userId: ${userId}`);
        }
    }


    async updateUserRole(id, role) {
        try {
            const user = await this.userRepository.updateById(
                id,
                {
                    role: role
                }
            );
            return user;
        } catch (error) {
            console.log(`Error in updating role of userId: ${userId}`);
        }
    }
}