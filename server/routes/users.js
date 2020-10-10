const express = require("express");
const bcrypt = require("bcrypt");
const { User, validateUser, userRole } = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send({ error: "Inputs validation problem" });
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(409).send({ error: "This email is taken" });
  }
  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  console.log("saved user");
  await Promise.reject(new Error("whoooppsss"));
});

module.exports = router;
