const express = require("express");
const uuid = require("uuid");
const { authRouter } = require("./authRouter");
const { pollRouter } = require("./pollRouter");
const { userHandler } = require("./userHandler");
const app = express();

// Allow user to specify the port
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing
app.use(express.json());

// front-end static content hosting
app.use(express.static("public"));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//set up sub-routers
apiRouter.use("/auth", authRouter);
apiRouter.use("/poll", pollRouter);
apiRouter.use("/user", userHandler);
