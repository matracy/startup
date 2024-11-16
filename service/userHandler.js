const { validateToken, getUser } = require("./authServices");
const { getPollsVotedIn } = require("./pollServices");

function userHandler(req, res) {
	const token = req.headers["authToken"];
	if (!token || !validateToken(token)) {
		return res.status(401).json({ message: "invalid credentials" });
	}
	const user = getUser(token);
	res.status(200).json(getPollsVotedIn(user));
}

module.exports = { userHandler };
