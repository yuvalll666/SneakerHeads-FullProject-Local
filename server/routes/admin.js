const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const _ = require("lodash");
const Joi = require("@hapi/joi");
const adminAuth = require("../middleware/adminAuth");
const adminEditorAuth = require("../middleware/adminEditorAuth");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const jwt = require("jsonwebtoken");
const { User, userRole } = require("../models/user");
const { Product } = require("../models/product");
const { ADMIN, EDITOR, NORMAL } = userRole;

router.put("/update-product/product_by_id", adminEditorAuth, (req, res) => {
  const productId = req.query.id;
  Product.findOneAndUpdate({ _id: productId }, req.body, { new: true }).exec(
    (err, product) => {
      if (err) {
        return res.status(400).send({ error: err });
      }
      return res.send(product);
    }
  );
});

router.get("/update-product/product_by_id", adminEditorAuth, (req, res) => {
  const productId = req.query.id;
  Product.findById({ _id: productId }).exec((err, product) => {
    if (err) {
      return res.status(400).send({ error: err });
    }
    return res.send(product);
  });
});

router.post(
  "/handle-products/undoDelete",
  adminEditorAuth,
  async (req, res) => {
    let product = await new Product(req.body);
    product.save();
    return res.send(product);
  }
);

router.delete("/handle-products/deleteProduct", adminEditorAuth, (req, res) => {
  const productId = req.query.id;

  Product.findOneAndDelete({ _id: productId }).exec((err, prod) => {
    if (err) {
      return res.status(400).send({ error: err });
    }
    return res.send(prod);
  });
});

router.get("/handle-products/getAllProducts", adminEditorAuth, (req, res) => {
  const filter = req.query.filter ? req.query.filter : null;
  let x = Product.find({}).sort({ createdAt: 1 });
  if (filter && filter !== "all") {
    x = x.find({ brand: filter });
  }

  x.exec((err, products) => {
    if (err) {
      return res.status(400).send({ error: err });
    }
    return res.send(products);
  });
});

router.post("/all-users/undoDelete", adminAuth, async (req, res) => {
  let user = await new User(req.body);
  user.save();
  return res.send(user);
});

router.delete("/all-users/deleteUser", adminAuth, (req, res) => {
  const userId = req.query.id;
  User.findOneAndDelete({ _id: userId }).exec((err, user) => {
    if (err) {
      return res.status(400).send({ error: err });
    }
    return res.send(user);
  });
});

router.post("/all-users/makeNormal", adminAuth, (req, res) => {
  const userId = req.query.id;
  User.findOneAndUpdate({ _id: userId }, { role: NORMAL }, { new: true }).exec(
    (err, user) => {
      if (err) {
        return res.status(400).send({ error: err });
      }
      return res.send(user);
    }
  );
});

router.post("/all-users/makeEditor", adminAuth, (req, res) => {
  const userId = req.query.id;
  User.findOneAndUpdate({ _id: userId }, { role: EDITOR }, { new: true }).exec(
    (err, user) => {
      if (err) {
        return res.status(400).send({ error: err });
      }
      return res.send(user);
    }
  );
});

router.get("/all-users/user_by_id", adminAuth, (req, res) => {
  const userId = req.query.id;

  User.findById({ _id: userId })
    .select(["-password", "-cart", "-history", "-__v", "-confirmed"])
    .exec((err, user) => {
      if (err) {
        return res.status(400).send({ error: err });
      }
      return res.send(user);
    });
});

router.get("/getAllUsers", adminAuth, (req, res) => {
  User.find({ role: { $ne: ADMIN } })
    .sort({ role: -1 })
    .exec((err, users) => {
      if (err) {
        return res.status(400).send({ success: false, err });
      }
      return res.send({ success: true, users });
    });
});

module.exports = router;
