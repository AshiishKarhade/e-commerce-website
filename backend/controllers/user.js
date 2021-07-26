var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "No User was Found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;

  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },

    (err, user) => {
      if (err) {
        return res
          .status(400)
          .json({ error: "You are not authorized to update " });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      res.status(200).send(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id }) // pulling up the order based on the user ID fom the order schema
    .populate("user", "_id name") //which model we want to update
    .exec((err, user) => {
      if (err) {
        return res.status(400).json({ Message: "No order to this account" });
      }
      return res.json(user);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];

  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transcation_id: req.body.order.transcation_id,
    });
  });
  // store in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true }, // means give the latest data not old data
    (err, purchases) => {
      if (either) {
        return res.status(400).json({ Error: "Unable to save purchase list" });
      }
      next();
    }
  );
};
