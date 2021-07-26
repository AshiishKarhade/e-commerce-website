const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, id, next) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({ Error: "Order Not Found" });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  // first we will use req.profile
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({ Error: "Fail to save order in DB" });
    }
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({ Error: "No Orders found in DB" });
      }
      res.json(order);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        res.status(400).json({ Error: "Cannot update order Status" });
      }
      res.json(order);
    }
  );
};
