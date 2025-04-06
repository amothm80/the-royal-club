import { selectAllPostsWithPosterName, savePost } from "../model/posts.js";
import { body, matchedData, validationResult } from "express-validator";

export const postValidation = () => {
  return [
    body("subject").trim().escape().notEmpty().withMessage("Invalid Subject"),
    body("content").trim().escape().notEmpty().withMessage("Invalid Content"),
  ];
};

export async function showPosts(req, res, next) {
  const { rows } = await selectAllPostsWithPosterName();
  console.log(rows);
  if (!req.user.member){
    rows.map(row=> row.name = 'Anon')
  }
  res.locals.posts = rows;
  res.render("posts");
}

export function addPostPage(req, res, next) {
  res.render("add-post");
}

export async function addPost(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    try {
      await savePost(data.subject, data.content,req.user.id);
      res.redirect("/posts");
    } catch (err) {
      console.log(err)
      res.status(500).render("500");
    }
  } else {
    console.log(req.body)
    res.locals.fields = req.body
    res.locals.errors = result.mapped();
    res.render("add-post");
  }

}
