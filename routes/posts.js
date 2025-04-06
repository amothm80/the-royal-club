import express from "express";
import passport from "passport";
import { showPosts } from "../controller/posts.js";

export const postsRouter = express.Router();

postsRouter.get('/posts',showPosts)