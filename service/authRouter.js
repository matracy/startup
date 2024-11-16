const express = require("express");
const {
	validateToken,
	issueToken,
	revokeToken,
	authUser,
} = require("./authServices");
const authRouter = express.Router();

// register user
authRouter.post("/", (req, res) => {
	const { name, email, password } = req.headers["credentials"];
	if (!name || !email || !password) {
		return res
			.status(400)
			.json({ message: "name, email, and password are required" });
	}
	const token = issueToken(name);
	res.json({ name: name, token: token });
});

// authenticate user
authRouter.get("/", (req, res) => {
	const { name, email } = req.headers["credentials"];
	if (!name || !password) {
		return res.status(400).json({ message: "name and password are required" });
	}
	if (authUser(name, password)) {
		const token = issueToken(name);
		res.json({ name: name, token: token });
	} else {
		return res.status(401).json({ message: "Invalid credentials" });
	}
});

// logout user
authRouter.delete("/", (req, res) => {
	const token = req.headers["authToken"];
	if (!token) {
		return res.status(400).json({ message: "authToken is required." });
	} else {
		revokeToken(token);
		res.status(200);
		res.json({ message: "Logged out." });
	}
});

module.exports = { authRouter };
