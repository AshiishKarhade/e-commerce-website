var express = require("express");
const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({ Error: "Category Not Found in DB" });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({ Messagae: "Unable to create Category" });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({ Messagae: "No Category Found" });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category; // this category is coming from the {getCategoryById} from line 10
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({ Messagae: "Failed to Update Category" });
    }
    res.json(updatedCategory);
  });
};
exports.removeCategory = (req, res) => {
  const category = req.category;
  console.log("Testing");
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({ Message: "Failed to Delete Category" });
    }
    res.json({ Message: `${category.name} is successfully Removed` });
  });
};
