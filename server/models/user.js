const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userRole = {
  NORMAL: 0,
  EDITOR: 1,
  ADMIN: 2,
};

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    role: {
      type: Number,
      required: true,
      default: 0,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

exports.User = User;
