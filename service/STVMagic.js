function sortByValue(obj) {
	// based on google AI answer to "js sort object by key value"
	return Object.entries(obj)
		.sort((a, b) => a[1] - b[1])
		.reduce((acc, [key, value]) => {
			acc.push(key);
			return acc;
		}, []);
}

function countVotes(ballots, validOptions) {
	var votes = {};
	ballots.forEach((ballot) => {
		const preferredOption = ballot.filter((opt) => {
			opt in validOptions;
		})[0];
		if (votes[preferredOption]) {
			votes[preferredOption] += 1;
		} else {
			votes[preferredOption] = 0;
		}
	});
	return votes;
}

function updatePoll(poll) {
	var options = Object.keys(poll.options);
	const sortedBallots = poll.ballots.forEach((ballot) => {
		ballot = sortByValue(ballot);
	});
	//NOTE: sortByValue orders least to greatest, so the *least* popular candidate will be first in the resulting array.
	const initialVotes = countVotes(sortedBallots, options);
	var finalVotes = initialVotes;
	while (Object.keys(finalVotes).length > 2) {
		finalVotes = countVotes(sortedBallots, sortByValue(finalVotes).slice(1));
	}
	options.forEach((opt) => {
		poll.options[opt].initialVotes = initialVotes[opt];
		poll.options[opt].finalVotes = finalVotes[opt];
	});
	poll.result = sortByValue(finalVotes)[1];
}

module.exports = { updatePoll };
