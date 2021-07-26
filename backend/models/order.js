var mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

// Defining multiple schemas in one file
const ProductCartSchema = new Schema({
  product: {
    // this are not magically appearing this are based on the previous ones
    type: ObjectId,
    ref: "Product", // There are basically 4 ways to writing schemas
  },
  name: String,
  count: Number,
  price: Number,
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new Schema( // Order Page
  {
    products: [ProductCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    updated: Date,
    status: {
      type: String,
      default: "Received",
      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"],
    },
    user: {
      // who is placing the order and for other stuff we requried user
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart };
