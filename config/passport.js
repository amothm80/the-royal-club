import passport from "passport";
import passportlocal from "passport-local";
import { pool } from "./database.js";
import { validatePassword } from "../lib/passwordUtils.js";
const LocalStrategy = passportlocal.Strategy;

const verifyCallback = async (username, password, done) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    const user = rows[0];
    if (!user) {
      return done(null, false, { message: "incorrect username" });
    }
    // const match = await bcrypt.compare(password, user.password);
    const isValid = validatePassword(password, user.hash, user.salt);
    if (!isValid) {
      return done(null, false, { message: "incorrect password" });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
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
