import express from "express";
import passport from "passport";
import { validatePassword, genPassword } from "../lib/passwordUtils.js";
import { pool } from "../config/database.js";
import { isAuthenticated, isAdmin } from "./authentication.js";

export const loginRouter = express.Router();

/**
 * LOGIN ROUTES
 *
 */

// When you visit http://localhost:3000/login, you will see "Login Page"
loginRouter.get("/login", (req, res, next) => {
  const form =
    '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

  res.render('login');
});

loginRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "login-success"
  })
);