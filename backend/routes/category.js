const express = require("express");
const router = express.Router();

const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  removeCategory,
} = require("../controllers/category");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// getroutes
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);

//create routes
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

//updates Routes
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//delete Routes

router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);
module.exports = router;
