import mongoose, { model, Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending", // Moderation status
    },
    flagged: {
        type: Boolean,
        default: false, // Flagged content
    },
    flaggedBy :{
      type: [mongoose.Schema.Types.ObjectId],
      ref : "User",
    }
  },
  { timestamps: true }
);

const Blog = new model('Blog',blogSchema);
export default Blog;