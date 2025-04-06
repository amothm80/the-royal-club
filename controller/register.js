import { addUserToUsers } from "../model/users.js";
import { body, matchedData, validationResult } from "express-validator";
import { validatePassword, genPassword } from "../lib/passwordUtils.js";

export const registrationValidation = () => {
  return [
    body("email")
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .withMessage("Invalid email"),
    body("name").trim().notEmpty().withMessage("Invalid name"),
    body("password")
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
      })
      .withMessage(
        "Password must be minimum 8 characters with 1 lowercase, 1 uppercase, 1 number and 1 symbol minimum"
      ),
    body("confirmPassword")
      .trim()
      .notEmpty()
      .custom((value, { req }) => value == req.body.password)
      .withMessage("The passwords must match"),
    body("membership")
      .trim()
      .escape()
      .equals("1234").withMessage( "Wrong embership code. You can keep it empty.").optional({values:'falsy'})
  ];
};

export async function registerUser(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    try {
      const saltHash = genPassword(req.body.password);
      await addUserToUsers(data.email, data.name, saltHash.hash, saltHash.salt);
      req.session.RegistrationSuccess = true;
      res.redirect('/login')
    } catch (err) {
      console.log(err)
      res.status(500).render("500");
    }
  } else {
    console.log(req.body)
    res.locals.fields = req.body
    res.locals.errors = result.mapped();
    res.render("register");
  }
}
