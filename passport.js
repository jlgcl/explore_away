const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
require("dotenv").config();
const pool = require("./db/index");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    (username, password, cb) => {
      // PSQL operation to find matching username & password
      pool.query(
        "SELECT username, password, privilege FROM users WHERE username=$1",
        [username],
        (err, response) => {
          if (err || response.rows[0] === undefined) {
            return cb(err);
          }
          bcrypt.compare(
            password,
            response.rows[0]["password"],
            (error, result) => {
              if (result) return cb(null, { id: response.rows[0] });
              else if (error) return cb(null, error.stack);
              else return cb(null, false, { message: "unsuccessful login" });
            }
          );
        }
      );
    }
  )
);

// Use for user list & profiles
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    (jwtPayload, cb) => {
      const user = pool.query("SELECT * FROM users WHERE id=$1", [
        jwtPayload.sub,
      ]);

      if (user) return cb(null, user);
      else if (err) {
        return cb(err, false);
      } else return cb(null, false);
    }
  )
);

// 'user' belongs to session, not db
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, cb) => {
  // PSQL query for user_id
  pool.query(
    "SELECT user_id, username FROM users WHERE id=($1)",
    [parseInt(id, 10)],
    (err, res) => {
      if (err) {
        return cb(err);
      }
      cb(null, res.rows[0]);
    }
  );
});
