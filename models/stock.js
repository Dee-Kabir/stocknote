const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const stockSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
    },
    title: {
      type: String,
      trim: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    cmp: {
      type: Number,
    },
    supportLevels: {
      type: Array
    },
    resistanceLevels: {
      type: Array
    },
    daily: {
      type: String,
    },
    weekly: {
      type: String,
    },
    dailyShot: {
      data: Buffer,
      contentType: String,
    },
    weeklyShot: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);
stockSchema.pre("save", function (next) {
  let stock = this;
  if (stock.isModified("name")) {
    stock.title = stock.name;
    return next();
  } else {
    return next();
  }
});

module.exports = mongoose.model("Stock", stockSchema);
