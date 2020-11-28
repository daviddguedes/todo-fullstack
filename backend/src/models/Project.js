const mongoose = require("mongoose");
const db = require("../database");
const { TaskSchema } = require("./Task");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  tasks: [TaskSchema],
  userId: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = db.model("Project", ProjectSchema);
module.exports = Project;
