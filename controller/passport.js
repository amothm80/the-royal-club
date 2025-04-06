import passport from "passport";
import passportlocal from "passport-local";
import { pool } from "../config/database.js";
import { findUserByEmail, findUserById } from "../model/users.js";
import { validatePassword } from "../lib/passwordUtils.js";
const LocalStrategy = passportlocal.Strategy;


//set custom username & password field names
const customFields = {
  usernameField: 'email',
  passwordField: 'password'
};

const verifyCallback = async (username, password, done) => {
  console.log("passport callback")

  try {
    const { rows } = await findUserByEmail(username)
    const user = rows[0];
    if (!user) {
      return done(null, false, { message: "Incorrect eMail and/or Password" });
    }
    // const match = await bcrypt.compare(password, user.password);
    const isValid = validatePassword(password, user.hash, user.salt);
    if (!isValid) {
      return done(null, false, { message: "Incorrect eMail and/or Password" });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const strategy = new LocalStrategy(customFields,verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  console.log('serialize')
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log('deserialize')
  try {
    const { rows } = await findUserById(id)
    const user = rows[0];
    done(null,user);
  } catch (error) {
    done(error);
  }
});
