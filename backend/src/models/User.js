const mongoose = require("mongoose");
const db = require("../database");
const crypto = require("crypto");

const hashPassword = value => crypto.createHash("sha256").update(value).digest("hex");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
    set: hashPassword,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = db.model("User", UserSchema);

User.hashPassword = (value) => hashPassword(value);
module.exports = User;
