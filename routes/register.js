import express from "express";
import { body, matchedData,validationResult } from "express-validator";
import passport from "passport";
import { validatePassword, genPassword } from "../lib/passwordUtils.js";
import { pool } from "../config/database.js";
import { isAuthenticated, isAdmin } from "./authentication.js";

export const registerRouter = express.Router();

const registrationValidation = () => {
    body('email').trim().escape().notEmpty();
    body('password').trim().escape().notEmpty();
    body('confirmPassword').trim().escape().notEmpty();
    body('membership').trim().escape().notEmpty();
}

registerRouter.get("/register", (req, res, next) => {
  res.render("register");
});

registerRouter.post("/register", async (req, res, next) => {
//   const saltHash = genPassword(req.body.password);
    console.log(req.body)
//   await pool.query(
//     "INSERT INTO users (username, hash, salt) VALUES ($1, $2, $3)",
//     [req.body.username, saltHash.hash, saltHash.salt]
//   );
  res.redirect("/");
});
