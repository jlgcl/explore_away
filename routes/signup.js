const express = require("express");
const { sanitizeBody, validationResult, body } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../db/index");

router.post("/api/signup", [
  body("username").trim().isLength({ min: 0 }),
  body("password").trim().isLength({ min: 0 }),
  // .custom((value, { req, loc, path }) => {
  //   if (value !== req.body.confirmPassword) {
  //     throw new Error("Passwords don't match"); // check for password & confirm password match
  //   } else {
  //     return value;
  //   }
  // }),
  (req, res, next) => {
    console.log(req);
    var errors = validationResult(req);

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      // PSQL operation to check if a user exists & add if exists
      const rows = pool.query("SELECT username FROM users WHERE password=$1", [
        req.body.password,
      ]);
      if (rows[0] !== null || rows[0] !== undefined) {
        let currentTimestamp = new Date().toLocaleString();
        pool
          .query(
            "INSERT INTO users(username, password, created_on) VALUES ($1, $2, $3)",
            [req.body.username, hashedPassword, currentTimestamp]
          )
          .then((res) => res.json("Signup successful"))
          .catch((err) => res.json(err.stack));
      } else {
        res.json("User already exists");
      }
    });
  },
]);

module.exports = router;
