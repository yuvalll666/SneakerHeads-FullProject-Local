const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const _ = require("lodash");
const Joi = require("@hapi/joi");
const adminAuth = require("../middleware/adminAuth");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const jwt = require("jsonwebtoken");
const { User, userRole } = require("../models/user");
const { ADMIN, EDITOR, NORMAL } = userRole;

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
      console.log(users);
      return res.send({ success: true, users });
    });
});

module.exports = router;
