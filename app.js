import path from "node:path";
import "dotenv/config";
import express from "express";
import session from "express-session";
import passport from "passport";
import helmet from "helmet";
import crypto from "crypto";
import pgSimple from "connect-pg-simple";
import { pool } from "./config/database.js";
import { __dirname } from "./lib/dirname.js";
import { router } from "./routes/index.js";

const pgSession = pgSimple(session);
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.disable("x-powered-by");
app.use((req, res, next) => {
  res.removeHeader("Server");
  next();
});
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * -------------- SESSION SETUP ----------------
 */

/**
 * utilizes connect-pg-simple. requires postgres database
 * use the below command to create the session table
 * psql mydatabase < node_modules/connect-pg-simple/table.sql
 */

const sessionStore = new pgSession({
  pool: pool, // Connection pool
});

app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 days,
    saveUninitialized: true,

    // Insert express-session options here
  })
);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
import "./config/passport.js";
app.use(passport.session());

// app.use((req, res, next) => {
//   console.log(req.user)
//   next();
// });

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
// app.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "login-failure",
//     successRedirect: "login-success"
//   })
// );

// app.post(
//   "/login",
//   passport.authenticate(
//     "local",
//     // function (error, user, info) {
//     //   // this will execute in any case, even if a passport strategy will find an error
//     //   // log everything to console
//     //   console.log(error);
//     //   console.log(user);
//     //   console.log(info);
//     // },
//     {
//       failureRedirect: "login-failure",
//       successRedirect: "login-success",
//     }
//   )
// );

app.use(router);

/**
 * Error
 */

app.use((err, req, res, next) => {
  console.error(new Date().toISOString());
  console.log(err);
  res.status(500).send(`Something broke!`);
});

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000, () => console.log("app listening on port 3000"));
