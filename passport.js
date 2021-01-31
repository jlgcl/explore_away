const passport = require("passport");
const LocalStrategy = require("passport-local");
const pool = require('./db/index')
const bcrypt = require('bcryptjs')

passport.use(
  new LocalStrategy((username, password, cb) => {
    // PSQL operation to find matching username & password
    const {rows} = await pool.query('SELECT username, password FROM users WHERE username=($1) AND password=($2)', [username, password], (err, res) => {
      if (err) { return cb(err) }
    })
    if (res.rows.length > 0) {
      cb(null, {id: res.rows[0]})
    } else {cb(null, false)}
  

    
    // bcrypt.compare(password, rows['rows'].password, (err, res) => {
    //         if (res) {
    //             cb(null, username, {message: 'logged in successfully'})
    //         } else {
    //             cb(null, false, 'incorrect password')
    //         }
    //     })
    // })
  })
);

// 'user' belongs to session, not db
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, cb) => {
  // PSQL query for user_id
    pool.query('SELECT user_id, username FROM users WHERE id=($1)', [parseInt(id, 10)], (err, results) => {
        if (err) {
            res.json("Error when selecting user on session deserialize", err)
            return cb(err)
        }

        cb(null, results.rows[0])
    })
});
