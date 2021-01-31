// TODO: learn data scraping & test passport login; what does 'user' return in auth.js? MAKE PASSPORT LOGIN WORK

const express = require("express");
const http_errors = require("http-errors");
const cookie_parser = require("cookie-parser");
const router = express.Router();
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const login = require("./routes/login");
const passport = require("passport");

var app = express();

// For Production Deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cookie_parser());

/// -------- AUTHENTICATION -------- ///
require("passport");
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(login);

/// -------- ROUTES -------- ///

// Catch all route for production
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

/// -------- ERROR HANDLERS -------- ///
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.messge = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
