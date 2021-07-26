var express = require("express");
const Product = require("../models/product");
const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");
const category = require("../models/category");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({ Error: "Product Not Found" });
      }
      req.product = product;
      next();
    });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.getallProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortby = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-photo")
    .populate("category")
    // .sort([["updatedAt", "descending"]])
    .sort([[sortby, "desc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({ Messagae: "No Product Found" });
      }
      res.json(products);
    });
};

exports.createProduct = (req, res) => {
  // creation of Form
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (error, fields, file) => {
    if (error) {
      return res.status(400).json({ error: "Problem is with file" });
    }
    //handling the fields(restriction on fields)
    // destructing the fields
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      res.status(400).json({ Error: "Please provide all the fields" });
    }

    let product = Product(fields);

    //handle the files
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File Size is Too Big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    console.log("Testing", product);
    //save to the DB
    product.save((error, product) => {
      if (error) {
        console.log("Error from backend", error);
        res.status(400).json({ error: "Saving T-shirt in database failed" });
      }
      res.json(product);
    });
  });
};

exports.deleteProduct = (req, res) => {
  const product = req.product;
  product.remove((err, product) => {
    if (err) {
      res.status(400).json({ Error: "Failed to delete Product" });
    }
    res.json({ Message: `${product.name} is successfully removed` });
  });
};

exports.updateProduct = (req, res) => {
  // creation of Form
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (error, fields, file) => {
    if (error) {
      return res.status(400).json({ error: "Problem is with file" });
    }

    //updation of the code
    let product = req.product;
    product = _.extend(product, fields);

    //handle the files
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File Size is Too Big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({ Error: "Updation Failed" });
      }
      res.json(product);
    });
  });
};

// middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });
  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      res.status(400).json({ Error: "Bulk Operations Failed" });
    }
    next();
  });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      res.status(400).json({ Error: "No Category Found" });
    }
    res.json(category);
  });
};
