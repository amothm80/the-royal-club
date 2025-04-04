import express from "express";
import session from "express-session";
import passport from "passport";
import { validatePassword, genPassword } from "../lib/passwordUtils.js";
import { pool } from "../config/database.js";
import { isAuthenticated, isAdmin } from "./authentication.js";
import { loginRouter } from "./login.js";
import { registerRouter } from "./register.js";
import { logoutRouter } from "./logout.js";

export const router = express.Router();

router.get("/", (req, res, next) => {
  res.redirect('/login')
});

/**
 * LOGIN ROUTE
 *
 */


router.use(loginRouter)

/**
 * LOGOUT ROUTE
 */

router.use(logoutRouter)

/**
 * REGISTRATION ROUTES
 */

router.use(registerRouter)

/**
 * PROFILE ROUTES
 */

/**
 * MESSAGE POST ROUTES
 */

/**
 * MESSAGE DISPLAY ROUTES
 */

/**
 * -------------- POST ROUTES ----------------
 */




/**
 * -------------- GET ROUTES ----------------
 */





/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 *
 * Also, look up what behaviour express session has without a maxage set
 */
router.get("/protected-route",isAuthenticated, (req, res, next) => {
  // This is how you check if a user is authenticated and protect a route.  You could turn this into a custom middleware to make it less redundant

    res.send(
      '<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>'
    );

});

router.get("/admin-route", isAdmin, (req,res,next)=>{
  res.send(
    '<h1>You are an admin</h1><p><a href="/logout">Logout and reload</a></p>'
  )
})

// Visiting this route logs the user out
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      res.redirect("/protected-route");
    }
  });
});

router.get("/login-success", (req, res, next) => {
  res.send(
    '<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>'
  );
});

router.get("/login-failure", (req, res, next) => {
  res.send("You entered the wrong password.");
});
