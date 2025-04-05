import express from "express";
import { body, matchedData, validationResult } from "express-validator";
import passport from "passport";
import { validatePassword, genPassword } from "../lib/passwordUtils.js";
import { isAuthenticated, isAdmin } from "./authentication.js";
import { registerUser } from "../controller/register.js";

export const registerRouter = express.Router();

const registrationValidation = () => {

  return [
    body("email").trim().escape().notEmpty().isEmail().withMessage("Invalid email"),
    body('name').trim().notEmpty().withMessage("Invalid name"),
    body(
      "password",
    )
      .trim()
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
      }).withMessage(      "Password must be minimum 8 characters with 1 lowercase, 1 uppercase, 1 number and 1 symbol minimum"
      ),
    body('confirmPassword').trim().notEmpty().custom((value, {req})=> value == req.body.password).withMessage('The passwords must match'),
    // body("membership")
    //   .trim()
    //   .escape()
    //   .equals("1234").withMessage( "Wrong embership code. You can keep it empty.").optional(),
  ];
};

registerRouter.get("/register", (req, res, next) => {
  res.render("register");
});

registerRouter.post("/register", registrationValidation(), async (req, res, next) => {
  const result = validationResult(req);
  console.log(validationResult(req));
  if(result.isEmpty()){
    const data = matchedData(req);
    const saltHash = genPassword(req.body.password);
    await registerUser(data.email, data.name, saltHash.hash, saltHash.salt)
    res.render('registration-successful')
  }else{
    res.redirect("/");
  }
  // //   const saltHash = genPassword(req.body.password);
  // console.log(req.body);
  // console.log(validationResult(req));
  // console.log(matchedData(req))
  // //   await pool.query(
  // //     "INSERT INTO users (username, hash, salt) VALUES ($1, $2, $3)",
  // //     [req.body.username, saltHash.hash, saltHash.salt]
  // //   );
  
});
