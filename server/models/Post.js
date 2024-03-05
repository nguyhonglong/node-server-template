import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: { type: String,  trim: true, required: [true, "Title must be provided"] },
    content: { type: String, trim: true, required: [true, "Content must be provided"] },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Author must be provided"]
    }
}, { timestamp: true });

const Post = mongoose.model("Post", postSchema);
export default Post;