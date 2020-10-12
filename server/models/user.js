const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

//create a user token with needed user information
userSchema.methods.generateAuthToken = function (options = null) {
  const token = jwt.sign(
    {
      _id: this.id,
      confirmed: this.confirmed,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
      email: this.email,
      password: this.password,
    },
    //----->>TODO: change Private Key
    process.env.JWT_TOKEN_KEY,
    options
  );

  return token;
};

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

function validatePassword(pass) {
  const schema = Joi.object({
    oldPassword: Joi.string().min(6).max(1024).required(),
    newPassword: Joi.string().min(6).max(1024).required(),
    confirmPassword: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(pass, { abortEarly: false });
}

function validateEditedUser(user) {
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
  });
  return schema.validate(user, { abortEarly: false });
}

module.exports = {
  User,
  validateUser,
  userRole,
  validatePassword,
  validateEditedUser,
};
