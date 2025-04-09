import {
  selectAllPostsWithPosterName,
  savePost,
  deletePostById,
} from "../model/posts.js";
import { body, matchedData, validationResult } from "express-validator";
import { format } from "date-fns";

export const postValidation = () => {
  return [
    body("subject").trim().notEmpty().withMessage("Invalid Subject"),
    body("content").trim().notEmpty().withMessage("Invalid Content"),
  ];
};

export async function showPosts(req, res, next) {
  console.log("posts route");

  const { rows } = await selectAllPostsWithPosterName();
  // console.log(rows);

  rows.map((row) => {
    if (!req.user.member) {
      row.name = "Anon";
    }
    row.date_time = format(row.date_time, "PPpp");

    return row;
  });

  if (req.session.savePostSuccess) {
    res.locals.savePostSuccess = true;
    req.session.savePostSuccess = "";
  }
  res.locals.posts = rows;
  res.locals.user = req.user;
  res.render("posts");
}

export function addPostPage(req, res, next) {
  res.render("add-post");
}

export async function deletePost(req, res, next) {
  if (req.isAuthenticated() && req.user.admin && req.params.postid) {
    await deletePostById(req.params.postid);
  }
  res.redirect("/posts");
}

export async function addPost(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    try {
      await savePost(data.subject, data.content, req.user.id);
      req.session.savePostSuccess = true;
      return res.redirect("/posts");
    } catch (err) {
      console.log(err);
      res.status(500).render("500");
    }
  } else {
    // console.log(req.body);
    res.locals.fields = req.body;
    res.locals.errors = result.mapped();
    res.render("add-post");
  }
}
