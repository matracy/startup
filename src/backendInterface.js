// const baseURL = "https://stvonline.someplaceto.click/api";
const baseURL = "http://localhost:4000/api";

async function registerNewUser(credentials, notifyCallback) {
	const response = await fetch(`${baseURL}/auth`, {
		method: "POST",
		headers: { credentials: JSON.stringify(credentials) },
	});
	const rjson = await response.json();
	notifyCallback(rjson.name, rjson.token);
}

async function registerPoll(opts, config, authToken, notifyCallback) {
	const response = await fetch(`${baseURL}/poll/create`, {
		method: "POST",
		body: JSON.stringify({ opttions: opts, settings: config }),
		headers: { authToken: authToken },
	});
	const rjson = await response.json();
	notifyCallback(rjson.pollID, rjson.registrationNumber);
}

async function fetchOptions(pollID) {
	const response = await fetch(`${baseURL}/poll`, {
		method: "GET",
		headers: { pollID: pollID },
	});
	var parsedOptions = [];
	response.json.options.forEach((opt) => {
		parsedOptions.push({ name: opt.name, rank: 0 });
	});
	return parsedOptions;
}

async function castVote(pollID, ballot, authToken) {
	var formattedBallot = {};
	ballot.forEach((opt) => {
		formattedBallot[opt] = opt.rank;
	});
	fetch(`${baseURL}/poll`, {
		method: "PATCH",
		body: JSON.stringify(formattedBallot),
		headers: { pollID: pollID, authToken: authToken },
	});
}

async function fetchResults(pollID) {
	const response = await fetch(`${baseURL}/poll`, {
		method: "GET",
		headers: { pollID: pollID },
	});
	return response.json.options;
}

async function authenticateUser(credentials, notifyCallback) {
	const response = await fetch(`${baseURL}/auth`, {
		method: "GET",
		headers: { credentials: JSON.stringify(credentials) },
	});
	const rjson = await response.json();
	notifyCallback(rjson.name, rjson.token);
}

async function registerToVote(registrationNumber, authToken) {
	const response = await fetch(`${baseURL}/poll/register`, {
		method: "POST",
		headers: { authToken: authToken },
		body: JSON.stringify({ registrationNumber: registrationNumber }),
	});
	return response.json.pollID;
}

async function fetchPolls(authToken) {
	if (!authToken) {
		return undefined;
	}
	const response = await fetch(`${baseURL}/user`, {
		method: "GET",
		headers: { authToken: authToken },
	});
	if (!response.ok) {
		return [];
	}
	var pollInfo = [];
	response.json.forEach(async (pollID) => {
		console.log(`Fetching results for ${pollID}`);
		const pollResults = await fetch(`${baseURL}/poll`, {
			method: "GET",
			headers: { pollID: pollID },
		});
		pollInfo.push({
			name: pollResults.json.id,
			result: pollResults.json.result,
		});
	});
	console.log(pollInfo);
	return pollInfo;
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
