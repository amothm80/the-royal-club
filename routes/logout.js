import express from "express";
import passport from "passport";


export const logoutRouter = express.Router();

// Visiting this route logs the user out
logoutRouter.get("/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      } else {
        res.redirect("/login");
      }
    });
  });