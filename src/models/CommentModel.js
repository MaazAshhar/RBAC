import { model, Schema } from "mongoose";

const commentSchema = new Schema({
    comment : {
        type : String,
        required : true,
    },
    commentedBy : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    blogId : {
        type : Schema.Types.ObjectId,
        ref : 'Blog',
        required : true
    }
});

const Comment = new model('Comment', commentSchema);
export default Comment;