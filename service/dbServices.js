import {
	users,
	tokens,
	polls,
	participationInfo,
	registrationInfo,
} from "./dummyData";

function mintToken(token) {
	tokens[token.id] = { name: token.name, expiration: token.expiration };
}

function fetchToken(tokenID) {
	const token = tokens[tokenID];
	if (!token) {
		return undefined;
	}
	return { id: tokenID, name: token.name, expiration: token.expiration };
}

function patchToken(tokenID, newData) {
	if (newData.name) {
		tokens[tokenID].name = newData.name;
	}
	if (newData.expiration) {
		tokens[tokenID].expiration = newData.expiration;
	}
}

function voidToken(tokenID) {
	delete tokens[tokenID];
}

function addUser(user) {
	users[user.name] = { email: email, password: password };
	participationInfo[user.name] = [];
}

function fetchUser(username) {
	const usr = users[username];
	if (!usr) {
		return undefined;
	}
	return { name: username, email: usr.email, password: usr.password };
}

function addPoll(poll) {
	polls[poll.id] = { options: poll.options, result: poll.result, ballots: [] };
}

function patchPoll(pollID, newData) {
	if (newData.options) {
		polls[pollID].options = newData.options;
	}
	if (newData.result) {
		polls[pollID].result = newData.result;
	}
	if (newData.ballots) {
		polls[pollID].ballots = newData.ballots;
	}
}

function fetchPoll(pollID) {
	const poll = polls[pollID];
	if (!poll) {
		return undefined;
	}
	return {
		id: pollID,
		options: poll.options,
		result: poll.result,
		ballots: poll.ballots,
	};
}

function fetchRegistrationInfo(registrationNumber) {
	const info = registrationInfo[registrationNumber];
	if (!info) {
		return undefined;
	}
	return {
		registrationNumber: registrationNumber,
		pollID: info.pollID,
		openDate: info.openDate,
		closeDate: info.closeDate,
		maxVoters: info.maxVoters,
		currentVoters: info.currentVoters,
		allowUnlimitedVoters: info.allowUnlimitedVoters,
	};
}

function patchRegistrationInfo(registrationNumber, newData) {
	if (newData.pollID) {
		registrationInfo[registrationNumber].pollID = newData.pollID;
	}
	if (newData.openDate) {
		registrationInfo[registrationNumber].openDate = newData.openDate;
	}
	if (newData.closeDate) {
		registrationInfo[registrationNumber].closeDate = newData.closeDate;
	}
	if (newData.maxVoters) {
		registrationInfo[registrationNumber].maxVoters = newData.maxVoters;
	}
	if (newData.currentVoters) {
		registrationInfo[registrationNumber].currentVoters = newData.currentVoters;
	}
	if (newData.allowUnlimitedVoters) {
		registrationInfo[registrationNumber].allowUnlimitedVoters =
			newData.allowUnlimitedVoters;
	}
}

function addRegistrationInfo(number, info) {
	registrationInfo[number] = info;
}

function fetchParticipation(username) {
	return participationInfo[username];
}

function patchParticipation(username, newData) {
	participationInfo[username] = newData;
}

export {
	mintToken,
	fetchToken,
	patchToken,
	voidToken,
	addUser,
	fetchUser,
	addPoll,
	patchPoll,
	fetchPoll,
	fetchRegistrationInfo,
	patchRegistrationInfo,
	addRegistrationInfo,
	fetchParticipation,
	patchParticipation,
};
