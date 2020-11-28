const express = require("express");
const auth = require("../middlewares/auth");
const Project = require("../models/Project");
const Task = require("../models/Task");

const router = express.Router();

/**
 * POST /tasks
 * Create a new task
 */
router.post("/", auth, async (req, res) => {
  if (!req.user.id) {
    res.status(401).send({ error: "User is not authenticated!" });
  }

  const { projectId, description } = req.body;

  if (!projectId || !description) {
    return res
      .status(400)
      .send({ error: "Project and task description are required." });
  }

  const project = await Project.findOne({ _id: projectId });

  if (!project) {
    return res.status(400).send({ error: "This project does not exists!" });
  }

  if (project.userId !== req.user.id) {
    return res
      .status(400)
      .send({ error: "You don't have permissions to do that" });
  }

  try {
    project.tasks.push({ description });
    project.save((err, done) => {
      if (err) return res.status(400).send({ error: "An error has ocurred." });
      res.send({ project });
    });
  } catch (error) {
    return res.status(400).send({ error: "An error has ocurred." });
  }
});

/**
 * DELETE /tasks
 * Delete a task
 */
router.delete("/", auth, async (req, res) => {
  if (!req.user.id) {
    res.status(401).send({ error: "User is not authenticated!" });
  }

  const { projectId, taskId } = req.body;
  if (!projectId || !taskId) {
    return res.status(400).send({ error: "Project and task is required." });
  }

  const project = await Project.findOne({ _id: projectId });

  if (!project) {
    return res.status(400).send({ error: "Project does not exists!" });
  }

  if (project.userId !== req.user.id) {
    return res
      .status(400)
      .send({ error: "You don't have permissions to do that" });
  }

  const taskIndex = project.tasks.findIndex((value) => value.id === taskId);

  if (taskIndex === -1) {
    return res.status(400).send({ error: "Task does not exists!" });
  }

  project.tasks.splice(taskIndex, 1);
  project.save((err, done) => {
    if (err) return res.status(400).send({ error: "An error has ocurred." });
    res.send({ project });
  });
});

/**
 * PUT /tasks
 * Update a task
 */
router.put("/", auth, async (req, res) => {
  if (!req.user.id) {
    res.status(401).send({ error: "User is not authenticated!" });
  }

  const { projectId, taskId, description, completed } = req.body;
  if (!projectId || !taskId) {
    return res.status(400).send({ error: "Project and task is required." });
  }

  if (description !== undefined && completed !== undefined) {
    return res.status(400).send({ error: "Operation invalid!" });
  }

  try {
    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      return res.status(400).send({ error: "Project does not exists!" });
    }

    if (project.userId !== req.user.id) {
      return res
        .status(400)
        .send({ error: "You don't have permissions to do that" });
    }

    if (completed !== undefined) {
      const doc = await Project.findOneAndUpdate(
        { _id: projectId, "tasks._id": taskId },
        {
          "tasks.$.completed": completed,
          "tasks.$.finishedAt": completed ? Date.now() : null,
        },
        {
          new: true,
          upsert: true,
          useFindAndModify: false
        }
      );
      res.send({ doc });
    } else {
      const doc = await Project.findOneAndUpdate(
        { _id: projectId, "tasks._id": taskId },
        {
          "tasks.$.description": description,
        },
        {
          new: true,
          upsert: true,
          useFindAndModify: false
        }
      );
      res.send({ doc });
    }

    
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({ error: "An error has ocurred." });
  }
});

module.exports = (app) => app.use("/tasks", router);
