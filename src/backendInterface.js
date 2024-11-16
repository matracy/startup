const baseURL = "https://stvonline.someplaceto.click/api";

function registerNewUser(credentials, notifyCallback) {
	const response = fetch(`${baseURL}/auth`, {
		method: "POST",
		headers: { credentials: credentials },
	});
	const rjson = response.json;
	notifyCallback({ name: rjson.name, token: rjson.token });
}

function registerPoll(opts, config, authToken, notifyCallback) {
	const response = fetch(`${baseURL}/poll/create`, {
		method: "POST",
		body: JSON.stringify({ opttions: opts, settings: config }),
		headers: { authToken: authToken },
	});
	const rjson = response.json;
	notifyCallback({ pollID: newPoll, registrationNumber: registrationNumber });
}

function fetchOptions(pollID) {
	const response = fetch(`${baseURL}/poll`, {
		method: "GET",
		headers: { pollID: pollID },
	});
	var parsedOptions = [];
	response.json.options.forEach((opt) => {
		parsedOptions.push({ name: opt.name, rank: 0 });
	});
	return parsedOptions;
}

function castVote(pollID, ballot, authToken) {
	var formattedBallot = {};
	ballot.forEach((opt) => {
		formattedBallot[opt] = opt.rank;
	});
	const response = fetch(`${baseURL}/poll`, {
		method: "PATCH",
		body: JSON.stringify(formattedBallot),
		headers: { pollID: pollID, authToken: authToken },
	});
	const rjson = response.json;
}

function fetchResults(pollID) {
	const response = fetch(`${baseURL}/poll`, {
		method: "GET",
		headers: { pollID: pollID },
	});
	return response.json.options;
}

function authenticateUser(credentials, notifyCallback) {
	const response = fetch(`${baseURL}/auth`, {
		method: "GET",
		headers: { credentials: credentials },
	});
	const rjson = response.json;
	notifyCallback({ name: rjson.name, token: rjson.token });
}

function registerToVote(registrationNumber, authToken, notifyCallback) {
	const response = fetch(`${baseURL}/poll/register`, {
		method: "POST",
		headers: { authToken: authToken },
		body: JSON.stringify({ registrationNumber: registrationNumber }),
	});
	notifyCallback({ pollID: response.json.pollID });
}

function fetchPolls(authToken) {
	const response = fetch(`${baseURL}/user`, {
		method: "GET",
		headers: { authToken: authToken },
	});
	var pollInfo = [];
	response.json.forEach((pollID) => {
		const pollResults = fetch(`${baseURL}/poll`, {
			method: "GET",
			headers: { pollID: pollID },
		});
		pollInfo.push({
			name: pollResults.json.id,
			result: pollResults.json.result,
		});
	});
	return pollInfo;
}

export {
	registerNewUser,
	registerPoll,
	fetchOptions,
	castVote,
	fetchResults,
	authenticateUser,
	registerToVote,
	fetchPolls,
};
