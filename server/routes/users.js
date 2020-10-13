const express = require("express");
const bcrypt = require("bcrypt");
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
