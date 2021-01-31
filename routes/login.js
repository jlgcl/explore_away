const express = require("express");
const router = express.Router();
const { body, sanitizeBody, validationResult } = require("express-validator");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log(user);
    res.send(user);
    // if (err || !user) {
    //   return res.status(400).json({
    //     message: info ? info.message : "login failed",
    //     user,
    //     err,
    //   });
    // }

    // req.login(user, (err) => {
    //   if (err) {
    //     res.json(err);
    //   }

    //   // TODO: check what 'user' is: from session or db? if from db, change to psql
    //   if (user.admin == true) {
    //     const token = jwt.sign(user.toJSON(), process.env.SECRET_KEY);
    //     res.json({ user, token });
    //   } else {
    //     const token = jwt.sign(user.toJSON(), process.env.PUBLIC_KEY);
    //     res.json({ user, token });
    //   }
    // });
  })(req, res);
});

module.exports = router;
