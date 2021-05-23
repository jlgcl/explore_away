const express = require("express");
const router = express.Router();
const { body, sanitizeBody, validationResult } = require("express-validator");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post("/api/login", (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : "login failed", // provide error mssage if exists in passport.js : 'login failed'
        user,
        err,
      });
    }

    req.login(user, (err) => {
      if (err) {
        res.json(err);
      }
      // check the user in db is admin & sign jwt
      if (user["id"]["privilege"] === "admin") {
        const token = jwt.sign(user, process.env.SECRET_KEY);
        res.json({ user, token, message: "Sign In Successful" });
      } else {
        const token = jwt.sign(user, process.env.PUBLIC_KEY);
        res.json({ user, token, message: "Sign In Successful" });
      }
    });
  })(req, res);
});

router.get("/api/signout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/api/user", (req, res) => {
  res.json(req.user);
});

module.exports = router;
