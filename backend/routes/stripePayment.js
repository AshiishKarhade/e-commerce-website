const express = require("express");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { stripePayment } = require("../controllers/stripePayment");
const router = express.Router();

router.post("/stripepayment", isSignedIn, isAuthenticated, stripePayment);

module.exports = router;
