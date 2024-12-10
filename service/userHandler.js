const { validateToken, getUser } = require("./authServices.js");
const { getPollsVotedIn } = require("./pollServices.js");

function userHandler(req, res) {
	const token = req.headers["authtoken"];
	if (!token) {
		return res.status(401).json({ message: "invalid credentials" });
	} else {
		validateToken(token, (isValid) => {
			if (!isValid) {
				return res.status(401).json({ message: "invalid credentials" });
			}
			getUser(token, (user) => {
				getPollsVotedIn(user, (polls) => {
					res.status(200).json(polls);
				});
			});
		});
	}
}

module.exports = { userHandler };
