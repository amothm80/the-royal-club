import passport from "passport";
import passportlocal from "passport-local";
import { pool } from "../config/database.js";
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
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [username]
    );
    const user = rows[0];
    if (!user) {
      return done(null, false, { message: "Incorrect Username and/or Password" });
    }
    // const match = await bcrypt.compare(password, user.password);
    const isValid = validatePassword(password, user.hash, user.salt);
    if (!isValid) {
      return done(null, false, { message: "Incorrect Username and/or Password" });
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
    const { rows } = await pool.query("select * from users where id = $1", [
      id,
    ]);
    const user = rows[0];
    done(null,user);
  } catch (error) {
    done(error);
  }
});
