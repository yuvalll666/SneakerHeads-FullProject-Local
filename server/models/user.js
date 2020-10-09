const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userRole = {
  NORMAL: 0,
  EDITOR: 1,
  ADMIN: 2,
};
const { NORMAL } = userRole;

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
      default: NORMAL,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(30)
      .required()
      .pattern(/^([^0-9]*)$/),
    lastName: Joi.string()
      .min(2)
      .max(30)
      .required()
      .pattern(/^([^0-9]*)$/),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(user, { abortEarly: false });
}

exports.User = User;
