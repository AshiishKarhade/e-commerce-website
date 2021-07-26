const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    res.json({ user });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER does not exit",
      });
    }

    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email and Passoword does not Match",
      });
    }
    // creating the token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    //  send response to frontend
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User Signout successfully",
  });
};

// Protected Routes
exports.isSignedIn = expressJwt({
  // in this middleware the next() is already there or written in expressJwt so we no need to specify explicitely
  secret: process.env.SECRET,
  algorithms: ["RSA", "sha1", "RS256", "HS256"],
  userProperty: "auth", // this middleware put this auth onto the request
});

// custom middlewares
exports.isAuthenticated = (req, res, next) => {
  //  isAuthenticated means user can change things in his own account
  const checker = req.profile && req.auth && req.profile._id == req.auth._id; // through a frontend we will set a property called profile, and this property is only going to set if user is login
  if (!checker) {
    res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    // this profile is going to set from the frontend
    res.status(403).json({
      error: "You are Not Admin, ACCESS DENIED",
    });
  }
  next();
};
