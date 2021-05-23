const express = require("express");
const { sanitizeBody, validationResult, body } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../db/index");

router.post("/api/signup", [
  body("username").trim().isLength({ min: 0 }),
  body("password").trim().isLength({ min: 0 }),
  (req, res, next) => {
    var errors = validationResult(req);

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      // PSQL operation to check if a user exists & add if exists
      const rows = pool.query("SELECT username FROM users WHERE user=$1", [
        req.body.username,
      ]);
      if (rows[0] === undefined) {
        let currentTimestamp = new Date().toLocaleString();
        pool
          .query(
            "INSERT INTO users(username, password, created_on) VALUES ($1, $2, $3)",
            [req.body.username, hashedPassword, currentTimestamp]
          )
          .then((response) => res.json("Signup Successful"))
          .catch((err) =>
            res.status(409).json("Signup Error: username may already exist")
          );
      } else {
        res.status(409).json({ error: "Username already exists" });
      }
    });
  },
]);

module.exports = router;
