function sortByValue(obj) {
	// based on google AI answer to "js sort object by key value"
	return Object.entries(obj)
		.sort((a, b) => a[1] - b[1])
		.reduce((acc, [key, _unused]) => {
			acc.push(key);
			return acc;
		}, []);
}

function countVotes(ballots, validOptions) {
	//FIXME why does this make votes[opt] undefined?
	var votes = {};
	ballots.forEach((ballot) => {
		const filteredOpts = ballot.filter((opt) => {
			return validOptions.includes(opt);
		});
		const preferredOption = filteredOpts[0];
		if (votes[preferredOption]) {
			votes[preferredOption] += 1;
		} else {
			votes[preferredOption] = 1;
		}
	});
	return votes;
}

function updatePoll(poll) {
	var options = [];
	poll.options.forEach((opt) => {
		options.push(opt.name);
	});
	const sortedBallots = [];
	poll.ballots.forEach((ballot) => {
		sortedBallots.push(sortByValue(ballot));
	});
	//NOTE: sortByValue orders least to greatest, so the *least* popular candidate will be first in the resulting array.
	var initialVotes = {};
	initialVotes = countVotes(sortedBallots, options);
	var finalVotes = initialVotes;
	while (Object.keys(finalVotes).length > 2) {
		finalVotes = countVotes(sortedBallots, sortByValue(finalVotes).slice(1));
	}
	poll.options.map((opt) => {
		opt.initialVotes = initialVotes[opt.name] ? initialVotes[opt.name] : 0;
		opt.finalVotes = finalVotes[opt.name] ? finalVotes[opt.name] : 0;
	});
	const endScores = sortByValue(finalVotes);
	poll.result = endScores[endScores.length - 1]; //NOTE: least popular candidates are sorted sooner
	return poll;
}

export { updatePoll };
