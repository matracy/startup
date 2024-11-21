import {
	addPoll,
	patchPoll,
	fetchPoll,
	fetchRegistrationInfo,
	patchRegistrationInfo,
	addRegistrationInfo,
	fetchParticipation,
	patchParticipation,
} from "./dbServices.js";
import { v4 } from "uuid";

import { updatePoll } from "./STVMagic.js";

function lookupPoll(pollID, callback) {
	fetchPoll(pollID, callback);
}

function getPollsVotedIn(user, callback) {
	fetchParticipation(user, callback);
}

function countBallot(ballot, pollID, username, callback) {
	getPollsVotedIn(username, (pollsVotedIn) => {
		lookupPoll(pollID, (poll) => {
			try {
				pollsParticipatedIn.push(pollID);
				patchParticipation(username, pollsParticipatedIn);
				poll.ballots.push(ballot);
				updatePoll(poll);
				patchPoll(pollID, poll);
				callback(true);
			} catch (err) {
				console.log(`Error counting ballot: ${err}`);
				callback(false);
			}
		});
	});
}

function registerToVote(registrationNumber, callback) {
	fetchRegistrationInfo(
		registrationNumber,
		({
			pollID,
			openDate,
			closeDate,
			maxVoters,
			currentVoters,
			allowUnlimitedVoters,
		}) => {
			const currTime = Date.now();
			if (
				!pollID ||
				openDate > currTime ||
				currTime > closeDate ||
				(!allowUnlimitedVoters && maxVoters - currentVoters <= 0)
			) {
				callback(undefined);
			}
			currentVoters += 1;
			try {
				patchRegistrationInfo(registrationNumber, {
					currentVoters: currentVoters,
				});
				callback(pollID);
			} catch (err) {
				console.log(`Error registering to vote: ${err}`);
				callback(undefined);
			}
		},
	);
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
	const registrationNumber = v4();
	addRegistrationInfo(registrationNumber, registrationInfo);
	return { pollID: newPoll.id, registrationNumber: registrationNumber };
}

export { lookupPoll, countBallot, registerToVote, createPoll, getPollsVotedIn };
