import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { getAllPosts, createOnePost, updateOnePost, deleteOnePost } from '../controllers/postController.js';

const Router = express.Router();

Router.route('/').get(getAllPosts).post(verifyToken, createOnePost)
Router.route('/:postId').put(verifyToken, updateOnePost).delete(verifyToken, deleteOnePost)

export default Router;