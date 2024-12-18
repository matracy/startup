const baseURL = "/api";

async function registerNewUser(credentials, notifyCallback) {
	const response = await fetch(`${baseURL}/auth`, {
		method: "POST",
		headers: { credentials: JSON.stringify(credentials) },
	});
	const rjson = await response.json();
	if (response.ok) {
		notifyCallback(rjson.name, rjson.token);
	}
}

async function registerPoll(opts, config, authToken, notifyCallback) {
	config.startDate = new Date(config.startDate).getTime();
	config.endDate = new Date(config.endDate).getTime();
	config.maxVoters = parseInt(config.maxVoters);
	const response = await fetch(`${baseURL}/poll/create`, {
		method: "POST",
		body: JSON.stringify({ options: opts, settings: config }),
		headers: { authToken: authToken, "Content-Type": "application/json" },
	});
	const rjson = await response.json();
	if (response.ok) {
		notifyCallback(rjson.pollID, rjson.registrationNumber);
	}
}

async function fetchOptions(pollID, notifyCallback) {
	const response = await fetch(`${baseURL}/poll`, {
		method: "GET",
		headers: { pollID: pollID },
	});
	var parsedOptions = [];
	const rjson = await response.json();
	function countingCallback() {
		//ensure that the callback is not fired before we finish processing the options
		if (parsedOptions.length == rjson.options.length) {
			notifyCallback(parsedOptions);
		}
	}
	rjson.options.forEach((opt) => {
		parsedOptions.push({ name: opt.name, rank: 0 });
		countingCallback();
	});
}

async function castVote(pollID, ballot, authToken) {
	fetch(`${baseURL}/poll`, {
		method: "PATCH",
		body: JSON.stringify(ballot),
		headers: {
			pollID: pollID,
			authToken: authToken,
			"Content-Type": "application/json",
		},
	});
}

async function fetchResults(pollID, notifyCallback) {
	const response = await fetch(`${baseURL}/poll`, {
		method: "GET",
		headers: { pollID: pollID },
	});
	const rjson = await response.json();
	notifyCallback(rjson.options);
}

async function authenticateUser(credentials, notifyCallback) {
	const response = await fetch(`${baseURL}/auth`, {
		method: "GET",
		headers: { credentials: JSON.stringify(credentials) },
	});
	const rjson = await response.json();
	notifyCallback(rjson.name, rjson.token);
}

async function registerToVote(registrationNumber, authToken, notifyCallback) {
	const response = await fetch(`${baseURL}/poll/register`, {
		method: "POST",
		headers: { authToken: authToken, "Content-Type": "application/json" },
		body: JSON.stringify({ registrationNumber: registrationNumber }),
	});
	if (response.ok) {
		const rjson = await response.json();
		notifyCallback(rjson.pollID);
	}
}

async function fetchPolls(authToken, callback) {
	if (!authToken) {
		return callback(undefined);
	}
	const response = await fetch(`${baseURL}/user`, {
		method: "GET",
		headers: { authToken: authToken },
	});
	if (!response.ok) {
		return callback([]);
	}
	var pollInfo = [];
	const rjson = await response.json();
	function countingCallback() {
		//ensure that the callback is not fired before we finish processing the results
		if (pollInfo.length == rjson.length) {
			callback(pollInfo);
		}
	}
	rjson.forEach(async (pollID) => {
		const pollResults = await fetch(`${baseURL}/poll`, {
			method: "GET",
			headers: { pollID: pollID },
		});
		const rjson = await pollResults.json();
		pollInfo.push({
			name: rjson.id,
			result: rjson.result,
		});
		countingCallback();
	});
}

async function signOut(token) {
	fetch(`${baseURL}/auth`, {
		method: "DELETE",
		headers: { authToken: token },
	});
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
	signOut,
};
