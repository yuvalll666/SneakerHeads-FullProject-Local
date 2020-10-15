const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Joi = require("@hapi/joi");
const multer = require("multer");
const auth = require("../middleware/auth");
const path = require("path");
const { Product, validateProduct } = require("../models/product");

router.get("/getProducts", auth, async (req, res) => {
  Product.find().exec((error, products) => {
    if (error) {
      return res.status(400).send({ success: false, error });
    }
    res.send({ success: true, products });
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
