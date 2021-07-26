var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 chars long"),

    check("email").isEmail().withMessage("Please provide a valid Email"),

    check("password")
      .isLength({ min: 3 })
      .withMessage("Password should be atleast 3 char")
      .matches(/\d/)
      .withMessage("Password must contain a number"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Please provide a valid Email"),

    check("password")
      .isLength({ min: 1 })
      .withMessage("Password Field is Requried")
      .matches(/\d/)
      .withMessage("Password Field is Requried"),
  ],
  signin
);
router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
  res.json(req.auth);
});

module.exports = router;
