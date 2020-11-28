const express = require("express");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/jwtConfig");
const { User } = require("../models/User");

const router = express.Router();

function tokenGenerator({ id, name, username }) {
  return jwt.sign({ id, name, username }, SECRET, {
    expiresIn: 86400,
  });
}

router.post("/signup", async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res
      .status(400)
      .send({ error: "Name, username and password is required!" });
  }

  try {
    if (await User.findOne({ username })) {
      return res.status(400).send({ error: "Username already exists" });
    }

    const user = await User.create(req.body);

    const token = tokenGenerator(user);

    return res.send({
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: "Signup failed" });
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "Username and password is required!" });
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return res.status(400).send({ error: "User not found!" });
  }

  if (user.password !== User.hashPassword(password)) {
    return res.status(400).send({ error: "Invalid username or password!" });
  }

  const token = tokenGenerator(user);

  return res.send({
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      createdAt: user.createdAt,
    },
    token,
  });
});

router.post("/delete", async (req, res) => {
  const { username } = req.body;

  try {
    if (await User.findOne({ username })) {
      await User.deleteOne({ username });
      return res.send({ message: "User removed!" });
    }

    return res.send({ error: "User does not exists" });
  } catch (error) {
    return res.status(400).send({ error: "Operation has failed" });
  }
});

module.exports = (app) => app.use("/auth", router);
