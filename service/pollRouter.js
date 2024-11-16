const express = require("express");
const { validateToken, getUser } = require("./authServices");
const {
	lookupPoll,
	countBallot,
	registerToVote,
	createPoll,
} = require("./pollServices");
const pollRouter = express.Router();

// Get poll info
pollRouter.get("/", (req, res) => {
	const pollID = req.headers["pollID"];
	if (!pollID) {
		return res.status(400).json({ message: "pollID is required" });
	}
	const poll = lookupPoll(pollID);
	if (!poll) {
		return res.status(404).json({ message: "no poll with matching pollID" });
	}
	res.status(200).json(poll);
});

// Cast vote
pollRouter.patch("/", (req, res) => {
	const token = req.headers["authToken"];
	if (!token || !validateToken(token)) {
		return res.status(401).json({ message: "invalid credentials" });
	}
	const pollID = req.headers["pollID"];
	if (!pollID) {
		return res.status(400).json({ message: "pollID is required" });
	}
	const poll = lookupPoll(pollID);
	if (!poll) {
		return res.status(404).json({ message: "no poll with matching pollID" });
	}
	const ballot = res.body;
	if (!ballot) {
		return res.status(400).json({ message: "ballot is required" });
	}
	var pollOptions = Object.keys(poll.options);
	var ballotOptions = Object.keys(ballot);
	var votedOnAllIssues = pollOptions.reduce((acc, opt) => {
		return acc && opt in ballotOptions;
	}, true);
	if (!votedOnAllIssues) {
		return res.status(400).json({ message: "must vote on all options" });
	}
	//now that validation is done, actually cast the vote
	if (countBallot(ballot, pollID, getUser(token))) {
		res.status(202).send();
	} else {
		return res.status(500).json({ message: "Error processing ballot." });
	}
});

// Register to vote
pollRouter.post("/register", (req, res) => {
	const token = req.headers["authToken"];
	if (!token || !validateToken(token)) {
		return res.status(401).json({ message: "invalid credentials" });
	}
	const pollID = req.headers["pollID"];
	if (!pollID) {
		return res.status(400).json({ message: "pollID is required" });
	}
	const poll = lookupPoll(pollID);
	if (!poll) {
		return res.status(404).json({ message: "no poll with matching pollID" });
	}
	const { registrationNumber } = res.body;
	if (!registrationNumber) {
		return res.status(400).json({ message: "registration number is required" });
	}
	const unlockedPoll = registerToVote(registrationNumber);
	if (!unlockedPoll) {
		return res.status(400).json({ message: "invalid registration number" });
	} else {
		res.status(200).json({ pollID: unlockedPoll });
	}
});

// - Create poll -> POST /api/poll/create
pollRouter.post("/create", (req, res) => {
	const token = req.headers["authToken"];
	if (!token || !validateToken(token)) {
		return res.status(401).json({ message: "invalid credentials" });
	}
	const { options, settings } = res.body;
	if (!options || !settings) {
		return res
			.status(400)
			.json({ message: "options and settings are required" });
	}
	const newPoll = createPoll(options, settings);
	if (!newPoll) {
		return res.status(500).json({ message: "could not create new poll" });
	} else {
		res.status(200).json({ pollID: newPoll });
	}
});

module.exports = { pollRouter };
