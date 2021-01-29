const express = require("express");
const { sanitizeBody, validationResut, body } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post(
  "/signup",

  [
    body("username").trim().isLength({ min: 0 }),
    body("password")
      .trim.isLength({ min: 0 })
      .custom((value, { req, loc, path }) => {
        if (value !== req.body.confirmPassword) {
          throw new Error("Passwords don't match");
        } else {
          return value;
        }
      }),

    (req, res, next) => {
      var errors = validationResult(req);

      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          return next(err);
        }

        // PSQL operation to check if a user exists

        // PSQL operation to add a new user is the user doesn't exists in db
      });
    },
  ]
);
