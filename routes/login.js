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
  res.render('login');
});
// import '../config/passport.js';

loginRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "login-failure",
    successRedirect: "login-success"
  })
);



loginRouter.get('/login-failure', (req,res,next)=>{
  res.render('login-failure')
})
loginRouter.get('/login-success', (req,res,next)=>{
  res.render('login-success')
})