const express = require("express");
const cors = require("cors");
const { validateToken, getUser } = require("./authServices.js");
const {
	lookupPoll,
	countBallot,
	registerToVote,
	createPoll,
} = require("./pollServices.js");
const pollRouter = express.Router();

//Since we don't care about CORS but the browser does, allow everything.
pollRouter.use(cors());
pollRouter.options("*", cors());

// Get poll info
pollRouter.get("/", (req, res) => {
	const pollID = req.headers["pollid"];
	if (!pollID) {
		return res.status(400).json({ message: "pollID is required" });
	}
	lookupPoll(pollID, (poll) => {
		if (!poll) {
			return res.status(404).json({ message: "no poll with matching pollID" });
		}
		res
			.status(200)
			.json({ id: pollID, options: poll.options, result: poll.result });
	});
});

// Cast vote
pollRouter.patch("/", (req, res) => {
	const token = req.headers["authtoken"];
	if (!token) {
		return res.status(401).json({ message: "invalid credentials" });
	} else {
		const pollID = req.headers["pollid"];
		if (!pollID) {
			return res.status(400).json({ message: "pollID is required" });
		} else {
			validateToken(token, (isValid) => {
				if (isValid) {
					lookupPoll(pollID, (poll) => {
						if (!poll) {
							return res
								.status(404)
								.json({ message: "no poll with matching pollID" });
						}
						const ballot = req.body;
						if (!ballot) {
							return res.status(400).json({ message: "ballot is required" });
						}
						var pollOptions = Object.keys(poll.options);
						var ballotOptions = Object.keys(ballot);
						var votedOnAllIssues = pollOptions.reduce((acc, opt) => {
							return acc && opt in ballotOptions;
						}, true);
						if (!votedOnAllIssues) {
							return res
								.status(400)
								.json({ message: "must vote on all options" });
						}
						//now that validation is done, actually cast the vote
						getUser(token, (user) => {
							countBallot(ballot, pollID, user, (wasCounted) => {
								if (wasCounted) {
									res.status(202).send();
								} else {
									return res
										.status(500)
										.json({ message: "Error processing ballot." });
								}
							});
						});
					});
				} else {
					return res.status(401).json({ message: "invalid credentials" });
				}
			});
		}
	}
});

// Register to vote
pollRouter.post("/register", (req, res) => {
	const token = req.headers["authtoken"];
	if (!token) {
		return res.status(401).json({ message: "invalid credentials" });
	} else {
		const regNum = req.body["registrationNumber"];
		if (!regNum) {
			return res
				.status(400)
				.json({ message: "registration number is required" });
		} else {
			validateToken(token, (isValid) => {
				if (isValid) {
					registerToVote(regNum, (unlockedPoll) => {
						if (!unlockedPoll) {
							return res
								.status(400)
								.json({ message: "invalid registration number" });
						} else {
							return res.status(200).json({ pollID: unlockedPoll });
						}
					});
				} else {
					return res.status(401).json({ message: "invalid credentials" });
				}
			});
		}
	}
});

// Create poll
pollRouter.post("/create", (req, res) => {
	const token = req.headers["authtoken"];
	if (!token) {
		return res.status(401).json({ message: "invalid credentials" });
	} else {
		validateToken(token, (isValid) => {
			if (isValid) {
				const { options, settings } = req.body;
				if (!options || !settings) {
					return res
						.status(400)
						.json({ message: "options and settings are required" });
				}
				const { pollID, registrationNumber } = createPoll(options, settings);
				if (!pollID || !registrationNumber) {
					return res.status(500).json({ message: "could not create new poll" });
				} else {
					res
						.status(200)
						.json({ pollID: pollID, registrationNumber: registrationNumber });
				}
			} else {
				return res.status(401).json({ message: "invalid credentials" });
			}
		});
	}
});

module.exports = { pollRouter };
