import BlogRepository from "../repositories/BlogRepository";

export default class BlogService{
    constructor(){
        this.blogRepository = new BlogRepository();
    }

    async createBlog(title, body, status="pending", userId){
        try {
            const payload = {title, body, status, createdBy : userId};
            await this.blogRepository.createBlog(payload);
            return true;
        } catch (error) {
            console.error("error in creating blog",error);
            return false;
        }
        
    }


    async deleteBlog(blogId){
        try{
            const payload = {
                _id : blogId,
            };
            return await this.blogRepository.deleteBlog(payload);
        }catch(error){
            console.error("error in deleting blog",error);
            return false;
        }
    }
}