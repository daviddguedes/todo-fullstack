const express = require("express");
const auth = require("../middlewares/auth");
const Project = require("../models/Project");

const router = express.Router();

/**
 * GET /projects
 * List all projects by current user
 */
router.get("/", auth, async (req, res) => {
  if (!req.user.id) {
    res.status(401).send({ error: "User is not authenticated!" });
  }

  const projects = await Project.find().where({ userId: req.user.id });

  if (!projects.length) {
    return res.send({ projects: [] });
  }

  res.send({ projects });
});

/**
 * POST /projects
 * Create a new project
 */
router.post("/", auth, async (req, res) => {
  if (!req.user.id) {
    res.status(401).send({ error: "User is not authenticated!" });
  }

  const { name } = req.body;
  if (await Project.findOne({ name: name.toUpperCase() })) {
    return res.status(400).send({ error: "This project name already exists!" });
  }

  try {
    const project = await Project.create({
      name: name.toUpperCase(),
      userId: req.user.id,
    });

    res.send({ project });
  } catch (error) {
    return res.status(400).send({ error: "An error has ocurred." });
  }
});

/**
 * PUT /projects
 * Update the name of the project
 */
router.put("/:projectId", auth, async (req, res) => {
  if (!req.user.id) {
    res.status(401).send({ error: "User is not authenticated!" });
  }

  const { projectId } = req.params;
  const { name } = req.body;
  if (!projectId) {
    return res.status(400).send({ error: "Project is required." });
  }

  if (!name) {
    return res.send({ message: "Nothing to change." });
  }

  const project = await Project.findById(projectId);

  if (!project) {
    return res.status(400).send({ error: "Project does not exists!" });
  }

  if (project.userId !== req.user.id) {
    return res
      .status(400)
      .send({ error: "You don't have permissions to do that" });
  }

  try {
    const projectUpdated = { ...project.toObject(), name: name.toString().toUpperCase() };
    await project.updateOne(projectUpdated);
    res.send({ updated: projectUpdated });
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({ error: "An error has ocurred." });
  }
});

/**
 * DELETE /projects
 * Delete a project
 */
router.delete("/:projectId", auth, async (req, res) => {
  if (!req.user.id) {
    res.status(401).send({ error: "User is not authenticated!" });
  }

  const { projectId } = req.params;
  if (!projectId) {
    return res.status(400).send({ error: "Project is required." });
  }

  const project = await Project.findById(projectId);

  if (!project) {
    return res.status(400).send({ error: "Project does not exists!" });
  }

  if (project.userId !== req.user.id) {
    return res
      .status(400)
      .send({ error: "You don't have permissions to do that" });
  }

  try {
    await project.delete();

    res.send({ message: "Success!" });
  } catch (error) {
    return res.status(400).send({ error: "An error has ocurred." });
  }
});

module.exports = (app) => app.use("/projects", router);
