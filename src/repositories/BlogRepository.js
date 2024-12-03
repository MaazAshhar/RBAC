import BaseRepository from "./BaseRepository.js";
import Blog from "../models/BlogModel.js";


class BlogRepository extends BaseRepository {
    
    constructor() {
        super(Blog);
    }

    
}