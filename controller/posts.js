import { selectAllPostsWithPosterName } from "../model/posts.js";

export async function showPosts(req, res, next) {
    const {rows} = await selectAllPostsWithPosterName()
    console.log(rows)
    res.locals.posts = rows
    res.render('posts')
}