const http = require("http");
const express = require("express");
const authController = require("./controllers/authController");
const projectController = require("./controllers/projectController");
const app = express();

app.use(express.json());

authController(app);
projectController(app);

const port = process.env.PORT || 8888;

http.createServer(app).listen(port);
