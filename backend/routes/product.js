const express = require("express");
const router = express.Router();

const {
  getProductById,
  getProduct,
  getallProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getAllUniqueCategories,
  photo,
} = require("../controllers/product");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

// params
router.param("productId", getProductById);
router.param("userId", getUserById);

// post Route
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);
// delete route
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);
// update route
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//listing routes
router.get("/products", getallProducts);

// getroutes
router.get("/product/:productId", getProduct);

router.get("/product/photo/:productId", photo);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
