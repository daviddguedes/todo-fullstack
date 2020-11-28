const mongoose = require("mongoose");
const db = require("../database");

const TaskSchema = new mongoose.Schema({
  description: {
    type: String,
    require: true,
  },
  completed: {
    type: Boolean,
    require: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  finishedAt: {
    type: Date,
    default: null,
  },
});

const Task = db.model("Task", TaskSchema);
module.exports = {
  Task,
  TaskSchema,
};
