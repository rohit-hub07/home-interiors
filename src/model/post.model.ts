import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },
  category: {
    type: String,
    enum: ["kitchen", "bedroom", "living", "bathroom", "gallery"],
    required: true,
  },
}, { timestamps: true });

const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

export default Post;