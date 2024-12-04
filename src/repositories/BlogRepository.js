import BaseRepository from "./BaseRepository.js";
import Blog from "../models/BlogModel.js";


export default class BlogRepository extends BaseRepository {
    
    constructor() {
        super(Blog);
    }


}