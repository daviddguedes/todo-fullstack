const express = require("express");
const auth = require("../middlewares/auth");
const User = require("../models/User");

const router = express.Router();

router.get("/", auth, (req, res) => {
  res.send({ user: req.user });
});

module.exports = (app) => app.use("/projects", router);
