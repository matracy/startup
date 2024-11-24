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
	console.log(
		`Valid options for this counting cycle are ${JSON.stringify(validOptions)}`,
	);
	ballots.forEach((ballot) => {
		console.log(`Filtering ballot ${JSON.stringify(ballot)}`);
		const filteredOpts = ballot.filter((opt) => {
			return validOptions.includes(opt);
		});
		console.log(`Filtered options are ${JSON.stringify(filteredOpts)}`);
		const preferredOption = filteredOpts[0];
		if (votes[preferredOption]) {
			votes[preferredOption] += 1;
		} else {
			votes[preferredOption] = 0;
		}
		console.log(
			`Set votes for ${preferredOption} to ${votes[preferredOption]}`,
		);
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
	const initialVotes = countVotes(sortedBallots, options);
	var finalVotes = initialVotes;
	while (Object.keys(finalVotes).length > 2) {
		finalVotes = countVotes(sortedBallots, sortByValue(finalVotes).slice(1));
	}
	options.forEach((opt) => {
		console.log(
			`Setting [${opt}] to have ${initialVotes[opt]} initial votes and ${finalVotes[opt]} final votes`,
		);
		poll.options[opt].initialVotes = initialVotes[opt] ? initialVotes[opt] : 0;
		poll.options[opt].finalVotes = finalVotes[opt] ? finalVotes[opt] : 0;
	});
	poll.result = sortByValue(finalVotes)[1]; //NOTE: least popular candidates are sorted sooner
	console.log(`Final state of poll: ${JSON.stringify(poll)}`);
}

export { updatePoll };
