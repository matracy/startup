function registerNewUser(credentials, notifyCallback) {
	notifyCallback({ name: credentials.username });
}

function registerPoll(opts, config) {
	//
}

function fetchOptions() {
	return { "Option 1": 0, "Option 2": 0, "Option 3": 0 };
}

function castVote(ballot) {
	//
}

function fetchResults(poll) {
	//
}

function authenticateUser(credentials, notifyCallback) {
	notifyCallback({ name: credentials.name });
}

function registerToVote() {
	//
}

function fetchPolls(user) {
	return [
		{ name: "Poll A", winner: "Option 1" },
		{ name: "Poll B", winner: "Option 2" },
		{ name: "Poll C", winner: "Option 3" },
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
