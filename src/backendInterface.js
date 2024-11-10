function registerNewUser(credentials, notifyCallback) {
	notifyCallback({ name: credentials.username });
}

function registerPoll(opts, config) {
	//This will only need to talk to the server
}

function fetchOptions() {
	return [
		{ name: "Option 1", rank: 0 },
		{ name: "Option 2", rank: 0 },
		{ name: "Option 3", rank: 0 },
	];
}

function castVote(ballot) {
	//This will only need to talk to the server
}

function fetchResults(poll) {
	alert("fetchResults is NYI");
}

function authenticateUser(credentials, notifyCallback) {
	notifyCallback({ name: credentials.name });
}

function registerToVote() {
	//This will only need to talk to the server
}

function fetchPolls(user) {
	return [
		{ name: "Poll A", result: "Option 1" },
		{ name: "Poll B", result: "Option 2" },
		{ name: "Poll C", result: "Option 3" },
	];
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
