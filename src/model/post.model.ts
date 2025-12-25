import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
},{timestamps: true});

const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

export default Post;