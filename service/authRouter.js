const { Router } = require("express");
const cors = require("cors");
const {
	issueToken,
	revokeToken,
	authUser,
	registerUser,
} = require("./authServices.js");
const authRouter = Router();

//Since we don't care about CORS but the browser does, allow everything.
authRouter.use(cors());
authRouter.options("*", cors());

// register user
authRouter.post("/", (req, res) => {
	const { username, password } = JSON.parse(req.headers["credentials"]);
	if (!username || !password) {
		return res.status(400).json({ message: "name and password are required" });
	}
	registerUser(username, password);
	const token = issueToken(username);
	res.json({ name: username, token: token });
});

// authenticate user
authRouter.get("/", (req, res) => {
	const { username, password } = JSON.parse(req.headers["credentials"]);
	if (!username || !password) {
		return res.status(400).json({ message: "name and password are required" });
	}
	authUser(username, password, (isAuthed) => {
		if (isAuthed) {
			const token = issueToken(username);
			res.json({ name: username, token: token });
		} else {
			return res.status(401).json({ message: "Invalid credentials" });
		}
	});
});

// logout user
authRouter.delete("/", (req, res) => {
	const token = req.headers["authtoken"];
	if (!token) {
		return res.status(400).json({ message: "authToken is required." });
	} else {
		revokeToken(token);
		res.status(200);
		res.json({ message: "Logged out." });
	}
});

module.exports = { authRouter };
