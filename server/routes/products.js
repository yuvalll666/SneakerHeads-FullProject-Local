const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const _ = require("lodash");
const Joi = require("@hapi/joi");
const multer = require("multer");
const auth = require("../middleware/auth");
const path = require("path");
const { Product, validateProduct } = require("../models/product");

router.get("/products_by_id", async (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;

  if (type === "array") {
  }

  await Product.findById({ _id: { $in: productIds } })
    .populate("writer")
    .exec((error, product) => {
      if (error) {
        return res.status(400).send({error: error})
      }
      return res.send(product)
    });
});

router.post("/getProducts", async (req, res) => {
  // let order = req.body.order ? req.body.order : "desc";
  // let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let lastId = req.body.lastId ? req.body.lastId : null;
  let term = req.body.searchTerm ? req.body.searchTerm : null;

  let findArgs = {};
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  let x = Product.find(findArgs);
  if (term) {
    x = x.find({ $text: { $search: term } });
  }
  if (lastId) {
    let ObjectId = require("mongodb").ObjectID;
    x = x.find({ _id: { $gt: ObjectId(lastId) } });
  }

  x.populate("writer")
    .limit(limit)
    .exec((error, products) => {
      if (error) {
        console.log(error);
        return res.status(400).send({ success: false, error });
      }
      res.send({
        success: true,
        products,
        postSize: products.length,
      });
    });
});

router.post("/uploadProduct", auth, async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) {
    return res.status(400).send({ error: "Inputs validation problem" });
  }
  const product = await new Product(req.body);
  await product.save();
  if (!product) {
    return res
      .status(500)
      .send({ error: "Unexpected error, could not save product to database" });
  }
  res.send(product);
});

const storage = multer.diskStorage({
  destination: "../public/uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
      return cb("Error: only jpg, png and jpeg are allowed", false);
    } else {
      cb(null, true);
    }
  },
}).single("file");

router.post("/uploadImage", auth, (req, res) => {
  upload(req, res, (error) => {
    if (error) {
      return res.status(400).send({ success: false, error });
    }
    return res.send({
      success: true,
      image: res.req.file.path.slice(10),
      fileName: res.req.file.filename,
    });
  });
});

module.exports = router;
