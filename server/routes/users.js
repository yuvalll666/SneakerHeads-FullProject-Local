const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validateUser, userRole } = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateUser();
  if (error) {
    return res.status(400).send({ error: "Inputs validation problem" });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(409).send({ error: "This email is taken" });
  }

  user = new User(_.pick(req.body, ["firstName", "lastName", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save((err) => {
    return res
      .status(500)
      .send({ error: "Unexpected error occurred trying to save your data" });
  });
});

module.exports = router;
