const http = require("http");
const express = require("express");
const cors = require("cors");

const app = express();

const authController = require("./controllers/authController");
const projectController = require("./controllers/projectController");
const taskController = require("./controllers/taskController");
const User = require("./models/User");

app.use(cors());
app.use(express.json());

authController(app);
projectController(app);
taskController(app);

const port = process.env.PORT || 8888;

http.createServer(app).listen(port);
