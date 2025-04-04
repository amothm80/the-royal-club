import express from "express";
import { body, matchedData, validationResult } from "express-validator";
import passport from "passport";
import { validatePassword, genPassword } from "../lib/passwordUtils.js";
import { pool } from "../config/database.js";
import { isAuthenticated, isAdmin } from "./authentication.js";

export const registerRouter = express.Router();

const registrationValidation = () => {
  return [
    body("email", "Invalid email").trim().escape().notEmpty().isEmail(),
    body(
      "password",
      "Password must be minimum 8 characters with 1 lowercase, 1 uppercase, 1 number and 1 symbol minimum"
    )
      .trim()
      .escape()
      .notEmpty()
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
      }),
    body('confirmPassword', 'The passwords must match').trim().escape().notEmpty().custom((value, {req})=> value == req.body.password),
    body("membership", "Wrong embership code. You can keep it empty.")
      .trim()
      .escape()
      .notEmpty()
      .optional()
      .equals("1234"),
  ];
};

registerRouter.get("/register", (req, res, next) => {
  res.render("register");
});

registerRouter.post("/register", registrationValidation(), (req, res, next) => {
  //   const saltHash = genPassword(req.body.password);
  console.log(req.body);
  console.log(validationResult(req));
  //   await pool.query(
  //     "INSERT INTO users (username, hash, salt) VALUES ($1, $2, $3)",
  //     [req.body.username, saltHash.hash, saltHash.salt]
  //   );
  res.redirect("/");
});
