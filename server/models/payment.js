const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    user: {
      type: Array,
      default: [],
    },
    data: {
      type: Array,
      default: [],
    },
    product: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

exports.Payment = Payment;
