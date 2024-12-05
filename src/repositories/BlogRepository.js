import BaseRepository from "./BaseRepository.js";
import Blog from "../models/BlogModel.js";


export default class BlogRepository extends BaseRepository {
    
    constructor() {
        super(Blog);
    }

    async createBlog(payload){
        const blog = this._model(payload);
        await this.save(blog);
    }

    async deleteBlog(payload){
        return this.deleteOne(payload);
    }

}