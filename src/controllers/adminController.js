export const createUser = async (req,res)=>{
    try {
        
    } catch (error) {
        console.log("error in creating user",error);
        return res.status(500).json({status : "failed",message : "Internal server error"});
    }
}

export const deleteUser = async (req,res)=>{
    try{

    }catch(error){
        console.log("error in deleting user",error);
        return res.status(500).json({status : "failed",message : "Internal server error"});
    }
}

export const banOrUnbanUser = async (req,res)=>{
    try {
        
    } catch (error) {
        console.log("error in banning user",error);
        return res.status(500).json({status : "failed",message : "Internal server error"});
    }
}

export const promoteUser = async (req,res)=>{
    try {
        
    } catch (error) {
        console.log("error in promoting user",error);
        return res.status(500).json({status : "failed",message : "Internal server error"});
    }
}

export const getAllUser = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log("error in getting users",error);
        return res.status(500).json({status : "failed",message : "Internal server error"});
    }
}