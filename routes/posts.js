import express from "express";
import passport from "passport";
import { showPosts,addPostPage, postValidation ,deletePost, addPost} from "../controller/posts.js";

export const postsRouter = express.Router();

postsRouter.get('/posts',showPosts)

postsRouter.get('/add-post',addPostPage)
postsRouter.post('/add-post',postValidation(), addPost)
postsRouter.get('/delete-post/:postid',deletePost)