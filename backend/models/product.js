var mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 20,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 2000,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      maxlength: 32,
      required: true,
      trim: true,
    },
    category: {
      type: ObjectId,
      ref: "Category", // always mention from where this object ID is coming form, and that is done using the reference parameter, and the name "Category" must be exactly same in line no 17from category schema
      required: true,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
