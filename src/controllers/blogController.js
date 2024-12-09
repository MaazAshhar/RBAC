import { MODERATOR_ROLE } from "../constants/commonConstants.js";
import BlogService from "../services/BlogService.js";

const blogService = new BlogService();


export const createPost = async(req,res)=>{
    try{
        const {title, body}  = req.body;
        const userId = req.user.id;
        const blogId = await blogService.createBlog(title, body, userId);
        if (blogId) {
            return res.status(201).json(
                {
                    status: 201,
                    message: "Blog created",
                    blogId: blogId
                }
            );
        }
        return res.status(400).json({status : "failed", error : "something went wrong"});
    }catch(error){
        console.log("error in creating post",error);
    }
    return res.status(500).json(
        {
            status: 500,
            message: "Error in creating blog"
        }
    );
}
export const deletePost = async (req,res)=>{
    try {
        const {blogId} = req.params;
        const blog = await blogService.deleteBlogById(blogId);
        if (blog) {
            return res.status(200).json(
                {
                    status: 200,
                    message: "Blog deleted",
                    blogId: blogId
                }
            );
        }
        return res.status(400).json({status : "failed", error : "Something went wrong"});
    } catch (error) {
        console.log("error in deleting post",error);
    }
    return res.status(500).json(
        {
            status: 500,
            message: "Error in creating blog"
        }
    );
}

export const updatePost = async (req,res)=>{
    try {
        const { blogId } = req.params;
        const {status, flagged, flaggedBy, ...payload} = req.body;
        const blog = await blogService.updateBlogById(blogId, payload);
        if (blog) {
            return res.status(200).json(
                {
                    status: 200,
                    message: "Blog Updated",
                    blogId: blogId
                }
            );
        }
        return res.status(400).json({status : "failed", error : "Something went wrong"});
    } catch (error) {
        console.log("error in updating post",error);
    }
    return res.status(500).json(
        {
            status: 500,
            message: "Error in updating blog"
        }
    );
}

export const flagOrUnflagPost = async(req,res)=>{
    try {
        const {blogId} = req.params;
        const userId = req.user.id;
        const {flag} = req.body;
        if (!flag && req.user.role !== MODERATOR_ROLE) {
            return res.status(400).json(
                {
                    status: 'failed',
                    message: "User doesn't have permission to unflag"
                }
            );
        }
        const blog = await blogService.updateFlagById(blogId, flag, userId);
        if(blog) {
            return res.status(200).json(
                {
                    status: 200,
                    message: "Updated Flag"
                }
            );
        };
        return res.status(400).json({status : "failed", error : "Something went wrong"});
    } catch (error) {
        console.log("error in flag post",error);
    }
    return res.status(500).json(
        {
            status: 500,
            message: "Error in updating flag"
        }
    );
}

export const curatePost = async (req, res)=>{
    try {
        const {blogId} = req.params;
        const {status} = req.body;
        const blog = await blogService.curatePostById(blogId, status);
        if(blog) {
            return res.status(200).json(
                {
                    status: 200,
                    message: `Blog having ${blogId} is curated`
                }
            );
        }
        return res.status(400).json({status : "failed", error : "Something went wrong"});
    } catch (error) {
        console.log("error in approving post",error);
    }
    return res.status(500).json(
        {
            status: 500,
            message: "Error in curating blog"
        }
    );
}

export const getAllBlogByUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        const blogs = await blogService.getAllBlogByUserId(userId);
        if (blogs) {
            return res.status(200).json(
                {
                    status: 200,
                    blogs: blogs
                }
            );
        }
        return res.status(400).json({status : "failed", error : "Something went wrong"});
    } catch (error) {
        console.log("error in getting blog",error);
    }
    return res.status(500).json(
        {
            status: 500,
            message: "Error in getting blog"
        }
    );
}
