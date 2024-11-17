import express from "express";
import { colorMagic } from "./colorMagic.js";
import { authRouter } from "./authRouter.js";
import { pollRouter } from "./pollRouter.js";
import { userHandler } from "./userHandler.js";

const app = express();

// Allow user to specify the port
const port = process.argv.length > 2 ? process.argv[2] : 4000;
//apply user-specified port setting
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

//potential bugfix incase of HTTP 502 on deploy
app.use((_req, res) => {
	res.sendFile("index.html", { root: "public" });
});

// JSON body parsing
app.use(express.json());

// front-end static content hosting
app.use(express.static("public"));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//set up sub-routers
apiRouter.use("/auth", authRouter);
apiRouter.use("/poll", pollRouter);
apiRouter.get("/user", userHandler);

//This is the bit that uses third-party API calls.
colorMagic();
