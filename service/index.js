const express = require("express");
const cors = require("cors");
const { colorMagic } = require("./colorMagic.js");
const { authRouter } = require("./authRouter.js");
const { pollRouter } = require("./pollRouter.js");
const { userHandler } = require("./userHandler.js");
const { pingDB } = require("./dbServices.js");
const { handleWebSocket } = require("./webSocetHandler.js");

const app = express();

// Allow user to specify the port
const port = process.argv.length > 2 ? process.argv[2] : 4000;

//deal with websockets
handleWebSocket(
	//apply user-specified port setting
	app.listen(port, () => {
		console.log(`Listening on port ${port}`);
	}),
);

// JSON body parsing
app.use(express.json());

// front-end static content hosting
app.use(express.static("public"));

//Since we don't care about CORS but the browser does, allow everything.
app.use(cors());
app.options("*", cors());

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//set up sub-routers
apiRouter.use("/auth", authRouter);
apiRouter.use("/poll", pollRouter);
apiRouter.get("/user", userHandler);

//This is the bit that uses third-party API calls.
colorMagic();

//test database connection
pingDB();
