import { express } from "express";
import { uuid } from "uuid";
import { colorMagic } from "./colorMagic";
import { authRouter } from "./authRouter";
import { pollRouter } from "./pollRouter";
import { userHandler } from "./userHandler";

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
apiRouter.get("/user", userHandler);

//apply user-specified port setting
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

//This is the bit that uses third-party API calls.
colorMagic();

timer.unref(); //don't hold things open if this is the only timer in the module that hasn't fired yet

//potential bugfix incase of HTTP 502 on deploy
// app.use((_req, res) => {
// 	res.sendFile("index.html", { root: "public" });
// });
