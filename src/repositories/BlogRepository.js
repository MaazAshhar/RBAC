import BaseRepository from "./BaseRepository.js";
import Blog from "../models/BlogModel.js";


export default class BlogRepository extends BaseRepository {
    
    constructor() {
        super(Blog);
    }

    async createBlog(payload){
        const blog = this._model(payload);
        return await this.save(blog);
    }

    async flagPost(id, flaggedBy) {
        const blog = await this._model.findByIdAndUpdate(
            id,
            { 
                flagged: true,
                $addToSet: { flaggedBy: flaggedBy } 
            }, 
            { new: true } 
        );
        return blog;
    }

    async unflagPost(id) {
        const blog = await this._model.findByIdAndUpdate(
            id,
            { flagged: false },
            { new: true }
        );
        return blog;
    }

}