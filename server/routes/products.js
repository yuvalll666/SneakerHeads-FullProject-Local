const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Joi = require("@hapi/joi");
const multer = require("multer");
const auth = require("../middleware/auth");
const path = require("path");

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
