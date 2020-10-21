const express = require("express");
const bcrypt = require("bcrypt");
const { Product } = require("../models/product");
const { Payment } = require("../models/payment");
const {
  User,
  validateUser,
  userRole,
  validateEditedUser,
  validatePassAndUser,
} = require("../models/user");
const router = express.Router();
const _ = require("lodash");
const Joi = require("@hapi/joi");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

router.post("/successBuy", auth, (req, res) => {
  let history = [];
  let transactionData = {};

  const { cartDetail, paymentData } = req.body;

  cartDetail.forEach((item) => {
    const { title, _id, price, quantity } = item;
    history.push({
      dateOfPurchase: Date.now(),
      name: title,
      _id: _id,
      price: price,
      quantity: quantity,
      paymentId: paymentData.paymentID,
    });
  });

  const { firstName, lastName, email } = req.user;
  transactionData.user = {
    _id: req.user._id,
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  transactionData.paymentData = paymentData;
  transactionData.product = history;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).send({ success: false, err });
      }

      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) {
          return res.send({ success: false, err });
        }

        res.send({ success: true, token: user.generateAuthToken() });
      });
    }
  );
});

router.get("/removeFromCart", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { cart: { _id: ObjectId(req.query._id) } } },
    { new: true },
    (err, user) => {
      const { cart } = user;
      let array = cart.map((item) => {
        return item;
      });

      Product.find({ _id: { $in: array } })
        .populate("writer")
        .exec((err, products) => {
          if (err) {
            return res.status(400).send({ error: err });
          }
          return res.send({ cart, products, token: user.generateAuthToken() });
        });
    }
  );
});

router.post("/addToCart", auth, async (req, res) => {
  const { productId } = req.body;

  await User.findOne({ _id: req.user._id }, (err, user) => {
    let duplicate = false;
    user.cart.forEach((item) => {
      if (item._id == productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id, "cart._id": ObjectId(productId) },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        (err, user) => {
          if (err) {
            return res.status(400).send({ success: false, err });
          }
          res.send({ token: user.generateAuthToken() });
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              _id: ObjectId(productId),
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, user) => {
          if (err) {
            return res.send({ success: false, err });
          }
          res.send({ token: user.generateAuthToken() });
        }
      );
    }
  });
});

//Delete
router.delete("/:id", auth, async (req, res) => {
  const user = await User.findOneAndDelete({
    _id: req.params.id,
    _id: req.user._id,
  }).select("-password");
  res.send(user);
});

//Edit
router.patch("/:id", auth, async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword && !newPassword && !confirmPassword) {
    const { error } = validateEditedUser(req.body);
    if (error) {
      return res.status(400).send({ error: "Inputs validation error" });
    }
  }

  if (oldPassword && newPassword !== confirmPassword) {
    return res.status(400).send({ error: "Passwords most be the same" });
  }
  if (oldPassword && newPassword === confirmPassword) {
    const { error } = validatePassAndUser(req.body);
    if (error) {
      return res.status(400).send({ error: "Inputs validation error" });
    }
    let user = await User.findById({ _id: req.params.id, _id: req.user._id });
    let validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return res.status(400).send("Invalid password");
    }
    let arr = ["oldPassword", "newPassword", "confirmPassword"];
    const salt = await bcrypt.genSalt(10);
    req.body["password"] = await bcrypt.hash(newPassword, salt);
    arr.forEach((key) => delete req.body[key]);
  }
  let user = await User.findOneAndUpdate(
    { _id: req.params.id, _id: req.user._id },
    req.body,
    {
      new: true,
    }
  );
  user = await user.save();
  if (!user)
    return res.status(404).send("The user with the given ID was not found");
  res.send({ token: user.generateAuthToken() });
});

//Login
router.post("/login", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  //--------------- Todo: add confirmed:true filter ----------------
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid email or password");
  }

  let validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid email or password");
  }

  res.send({ token: user.generateAuthToken() });
});

function validateLogin(req) {
  const schema = Joi.object({
    email: Joi.string().required().email().min(5).max(255),
    password: Joi.string().required().min(2).max(255),
  });
  return schema.validate(req);
}

//Signin
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send({ error: "Inputs validation problem" });
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(409)
      .send({ error: "Email address is already rgistered" });
  }
  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "firstName", "lastName", "email"]));
});

module.exports = router;
