import UserService from "../services/UserService.js";


const userService = new UserService();

export const updateUser = async (req,res)=>{
    try {
        const userId=req.params.id;
        if(userId !== req.user?.id){
            return res.status(403).json({message:"You are not authorized to update this user."});
        }
        const {username, email, password, isActive, role, ...payload} = req.body;
        const resp=await userService.updateUserById(userId, payload);
        if(resp){
            return res.status(200).json({status : "success", message:"User updated successfully"});
        }
        return res.status(400).json({status : "failed", message : "something went wrong"});
    } catch (error) {
        console.log("error in updating user",error);
        return res.status(500).json({status : "failed", message : "Internal server error"});
    }
}


export const getUserById = async (req,res)=>{
    try {
        const userId = req.params.id;
        if(userId !== req.user.id){
            return res.status(403).json({status : "failed", message:"You are not authorized to view this user."});
        }
        const [user, error] = await userService.getUserById(userId);
        if(error){
            return res.status(error.status).json({status : "failed", message : error.message});
        }
        return res.status(200).json({status : "success", data : user});
    } catch (error) {
        console.log("error in getting user",error);
        return res.status(500).json({status : "failed", message : "Internal server error"});
    }
}