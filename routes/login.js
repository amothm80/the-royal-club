import express from "express";
import passport from "passport";

export const loginRouter = express.Router();

/**
 * LOGIN ROUTES
 *
 */

// When you visit http://localhost:3000/login, you will see "Login Page"
loginRouter.get("/login", (req, res, next) => {
  if (req.session.loginError) {
    res.locals.error = "Wrong email/password provided";
    req.session.loginError = "";
  }
  res.render("login");
});
// import '../controller/passport.js';

loginRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "login-failure",
    successRedirect: "login-success",
  })
);

// loginRouter.post("/login", function (req, res, next) {
//   passport.authenticate("local", function (err, user, info) {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       res.locals.fields = req.body
//       res.locals.error = info.message
//       return res.render('login')
//     }

//     // // NEED TO CALL req.login()!!!

//     req.login(user, function (err) {
//       if (err) {
//         return next(err);
//       }
//       return res.redirect("/login-success");
//     });
//   })(req, res, next);
// });

loginRouter.get("/login-failure", (req, res, next) => {
  req.session.loginError = true;
  res.redirect("/login");
});
loginRouter.get("/login-success", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.name = req.user.name;
    res.render("login-success");
  } else {
    res.redirect("/login")
  }
});
