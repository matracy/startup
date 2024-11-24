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
	getPollsVotedIn(username, (pollsParticipatedIn) => {
		console.log(
			`pollsParticipated in is a ${typeof pollsParticipatedIn} with value ${JSON.stringify(pollsParticipatedIn)}`,
		);
		lookupPoll(pollID, (poll) => {
			try {
				pollsParticipatedIn.push(pollID);
				console.log(`Polls participated in: ${pollsParticipatedIn}`);
				patchParticipation(username, pollsParticipatedIn);
				poll.ballots.push(ballot);
				updatePoll(poll);
				console.log(`Poll as seen by countBallot: ${JSON.stringify(poll)}`);
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
				return callback(undefined);
			}
			currentVoters += 1;
			try {
				patchRegistrationInfo(registrationNumber, {
					currentVoters: currentVoters,
				});
				return callback(pollID);
			} catch (err) {
				console.log(`Error registering to vote: ${err}`);
				return callback(undefined);
			}
		},
	);
}

function createPoll(options, settings) {
	var formattedOpts = [];
	options.forEach((opt) => {
		formattedOpts.push({ name: opt, initialVotes: 0, finalVotes: 0 });
	});
	const newPoll = {
		id: settings.name,
		options: formattedOpts,
		result: undefined,
	};
	const registrationInfo = {
		pollID: settings.name,
		openDate: settings.startDate,
		closeDate: settings.endDate,
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
