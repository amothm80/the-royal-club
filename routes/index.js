import express from "express";
import session from "express-session";
import passport from "passport";
import { validatePassword, genPassword } from "../lib/passwordUtils.js";
import { pool } from "../config/database.js";
// import { isAuthenticated, isAdmin } from "./authentication.js";
import { authenticateRouter } from "./authenticate.js";
import { registerRouter } from "./register.js";
import { postsRouter } from "./posts.js";

export const router = express.Router();
router.get("/", (req, res, next) => {
  console.log("root route")

  res.redirect('/login')
});

/**
 * LOGIN ROUTE & LOGOUT ROUTE
 *
 */

router.use(authenticateRouter)


/**
 * REGISTRATION ROUTES
 */

router.use(registerRouter)



router.use((req,res,next)=>{
  console.log("login redirect when unauthenticated")
  console.log("Authenticated:", req.isAuthenticated());

  if (!req.isAuthenticated()){
    res.redirect('/login')
  }
  next()
})

/**
 * PROFILE ROUTES
 */

/**
 *  POSTS ROUTES
 */

router.use(postsRouter)





/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 *
 * Also, look up what behaviour express session has without a maxage set
 */
// router.get("/protected-route",isAuthenticated, (req, res, next) => {
//   // This is how you check if a user is authenticated and protect a route.  You could turn this into a custom middleware to make it less redundant

//     res.send(
//       '<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>'
//     );

// });

// router.get("/admin-route", isAdmin, (req,res,next)=>{
//   res.send(
//     '<h1>You are an admin</h1><p><a href="/logout">Logout and reload</a></p>'
//   )
// })

