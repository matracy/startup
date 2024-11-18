import { validateToken, getUser } from "./authServices.js";
import { getPollsVotedIn } from "./pollServices.js";

function userHandler(req, res) {
	const token = req.headers["authtoken"];
	console.log(`Got authToken ${token}`);
	console.log(Object.keys(req.headers));
	if (!token || !validateToken(token)) {
		return res.status(401).json({ message: "invalid credentials" });
	}
	const user = getUser(token);
	res.status(200).json(getPollsVotedIn(user));
}

export { userHandler };
