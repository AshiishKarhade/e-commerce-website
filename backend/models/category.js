var mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 40,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
