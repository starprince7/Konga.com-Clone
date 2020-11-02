const mongoose = require("mongoose");

const transcationSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
  },
    email: String,
    name: String,
    amount: Number,
    city: String,
    address: String,
    phone: String,
    cart: [{}]
  },
  { timestamps: true }
);

const Transcation = mongoose.model("Transcation", transcationSchema);

module.exports = Transcation;
