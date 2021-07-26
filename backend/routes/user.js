var express = require("express");
var router = express.Router();
const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require("../controllers/user.js");
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/auth.js");

router.param("userId", getUserById);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.put(
  "/orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;
