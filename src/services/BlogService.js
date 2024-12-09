import BlogRepository from "../repositories/BlogRepository.js";

export default class BlogService{
    constructor(){
        this.blogRepository = new BlogRepository();
    }

    async createBlog(title, body, userId){
        try {
            const status="pending";
            const payload = {title, body, status, createdBy : userId};
            const blog = await this.blogRepository.createBlog(payload);
            return blog.id;
        } catch (error) {
            console.error("error in creating blog",error);
        }
        
    }


    async updateBlogById(id, payload) {
        try {
            const { status, flagged, ...updatablePayload} = payload;
            const blog = await this.blogRepository.updateById(id, updatablePayload);
            return blog;
        } catch (error) {
            console.error(`error: ${error} in updating blog having blogId: ${id}`);
        }
    }


    async deleteBlogById(blogId){
        try{
            const payload = {
                _id : blogId,
            };
            return await this.blogRepository.deleteOne(payload);
        }catch(error){
            console.error("error in deleting blog",error);
        }
    }


    async updateFlagById(id, flag, flaggedBy) {
        try {
            let blog;
            if (flag) {
                blog = await this.blogRepository.flagPost(id, flaggedBy);
            } else {
                blog = await this.blogRepository.unflagPost(id);
            }
            return blog;
        } catch(error) {
            console.error("error in updating flag",error);
        }
    }

    async curatePostById(id, status) {
        try {
            const payload = {
                status: status
            };
            const blog = await this.blogRepository.updateById(id, payload);
            return blog;
        } catch (error) {
            console.error(`error: ${error} in curating blog having blogId: ${id}`);
        }
    }

    async getAllBlogByUserId(userId) {
        try {
            return await this.blogRepository.query(
                {
                    createdBy: userId
                }
            );
        } catch (error) {
            console.error(`error: ${error} in curating blog having blogId: ${id}`);
        }
    }
    

    async getAllPost(){
        return await this.blogRepository.query(
            {
                status : "approved"
            }
        )
    }
}
