const express = require("express");
const http_errors = require("http-errors");
const cookie_parser = require("cookie-parser");
const router = express.Router();
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const passport = require("passport");

const login = require("./routes/login");
const signup = require("./routes/signup");
const scrapeController = require("./scraper/scrapeController");
const cityList = require("./routes/cityList");
const itinerary = require("./itinerary/itinerary");

var app = express();

// For Production Deployment
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client/build")));
// }

app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());

/// -------- AUTHENTICATION -------- ///

require("./passport"); // MUST direct to the passport.js file NOT the dependency
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

/// -------- ROUTES -------- ///
app.use(login);
app.use(signup);
app.use(scrapeController);
app.use(cityList);
app.use(itinerary);

/// -------- PRIVILEGED ROUTES -------- //
//app.use("/itinerary", passport.authenticate("jwt"), itinerary);

// Catch all route for production
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build/index.html"));
// });

/// -------- ERROR HANDLERS -------- ///

// app.use((req, res, next) => {
//   next(createError(404));
// });

app.use((err, req, res, next) => {
  res.locals.messge = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
