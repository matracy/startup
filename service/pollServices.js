const {
	addPoll,
	patchPoll,
	fetchPoll,
	fetchRegistrationInfo,
	patchRegistrationInfo,
	addRegistrationInfo,
	fetchParticipation,
	patchParticipation,
} = require("./dbServices");

const { updatePoll } = require("./STVMagic");

function lookupPoll(pollID) {
	return fetchPoll(pollID);
}

function getPollsVotedIn(user) {
	return fetchParticipation(user);
}

function countBallot(ballot, pollID, username) {
	try {
		var poll = lookupPoll(pollID);
		var pollsParticipatedIn = getPollsVotedIn(username);
		pollsParticipatedIn.push(pollID);
		patchParticipation(username, pollsParticipatedIn);
		poll.ballots.push(ballot);
		updatePoll(poll);
		patchPoll(pollID, poll);
		return true;
	} catch (err) {
		console.log(`Error counting ballot: ${err}`);
		return false;
	}
}

function registerToVote(registrationNumber) {
	const { pollID, openDate, closeDate, maxVoters, currentVoters } =
		fetchRegistrationInfo(registrationNumber);
	const currTime = Date.now();
	if (
		!pollID ||
		openDate > currTime ||
		currTime > closeDate ||
		(!allowUnlimitedVoters && maxVoters - currentVoters <= 0)
	) {
		return undefined;
	}
	currentVoters += 1;
	try {
		patchRegistrationInfo(registrationNumber, { currentVoters: currentVoters });
		return pollID;
	} catch (err) {
		console.log(`Error registering to vote: ${err}`);
		return undefined;
	}
}

function createPoll(options, settings) {
	var formattedOpts = {};
	options.forEach((opt) => {
		formattedOpts[opt].initialVotes = 0;
		formattedOpts[opt].finalVotes = 0;
	});
	const newPoll = {
		id: settings.name,
		options: formattedOpts,
		result: undefined,
	};
	const registrationInfo = {
		pollID: settings.name,
		openDate: settings.openDate,
		closeDate: settings.closeDate,
		maxVoters: settings.maxVoters,
		currentVoters: 0,
		allowUnlimitedVoters: settings.allowUnlimitedVoters,
	};
	addPoll(newPoll);
	addRegistrationInfo(registrationNumber, registrationInfo);
	return newPoll.id;
}

module.exportts = {
	lookupPoll,
	countBallot,
	registerToVote,
	createPoll,
	getPollsVotedIn,
};
