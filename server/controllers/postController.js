import Post from '../models/Post.js';

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().populate('author','name').select('content createdAt');
        res.status(200).json({
            status: 'success',
            data: { posts }
        });
    } catch (error) {
        res.json({ error: error });
    }
}

export const createOnePost = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const post = await Post.create({ ...req.body, author: userId });
        res.status(200).json({
            status: 'success',
            data: { post }
        });
    } catch (error) {
        next(error);
    }
};

export const updateOnePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ error: 'Bài viết không tồn tại' });
    }

    res.status(200).json({
      status: 'success',
      data: { post: updatedPost },
    });
    } catch (error) {
        next(error);
    }
}

export const deleteOnePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const post = await Post.findByIdAndDelete(postId);
        res.status(200).json({
            status: 'delete success',
            
        })
    } catch (error) {
    }
}