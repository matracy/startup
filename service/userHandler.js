import { validateToken, getUser } from "./authServices.js";
import { getPollsVotedIn } from "./pollServices.js";

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

export { userHandler };
