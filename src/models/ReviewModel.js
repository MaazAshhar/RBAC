import { model, Schema } from "mongoose";

const reviewSchema = new Schema({
    review : {
        type : String,
        required : true,
    },
    reviewedBy : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    blogId : {
        type : Schema.Types.ObjectId,
        ref : 'Blog',
        required : true,
    }
})

const Review = new model('Riview',reviewSchema);
export default Review;
