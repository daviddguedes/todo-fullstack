const express = require("express");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/jwtConfig");
const { User } = require("../models/User");

const router = express.Router();

function tokenGenerator({ id, name, email }) {
  return jwt.sign({ id, name, email }, SECRET, {
    expiresIn: 86400,
  });
}

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .send({ error: "Name, email and password is required!" });
  }

  try {
    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "email already exists" });
    }

    await User.create(req.body);

    return res.send({
      message: 'Success!'
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: "Signup failed" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "email and password is required!" });
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).send({ error: "User not found!" });
    }

    if (user.password !== User.hashPassword(password)) {
      return res.status(400).send({ error: "Invalid email or password!" });
    }

    const token = tokenGenerator(user);

    return res.send({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    return res.status(400).send({ error: "email and password is required!" });
  }
});

router.post("/delete", async (req, res) => {
  const { email } = req.body;

  try {
    if (await User.findOne({ email })) {
      await User.deleteOne({ email });
      return res.send({ message: "User removed!" });
    }

    return res.send({ error: "User does not exists" });
  } catch (error) {
    return res.status(400).send({ error: "Operation has failed" });
  }
});

module.exports = (app) => app.use("/auth", router);
// 5fc24c93d89ea56d05c3378e = id daviddguedes
