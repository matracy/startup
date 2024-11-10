import { useState } from "react";
import { fetchOptions, castVote } from "../backendInterface";
import { pollOption } from "../components/pollOption";

function areValuesUnique(obj) {
	const values = Object.values(obj);
	const uniqueValues = new Set(values);
	return values.length === uniqueValues.size;
}

function Poll({ poll }) {
	const [options, setOptions] = useState(fetchOptions(poll));

	function submitBallot() {
		results = {};
		options.forEach((opt) => {
			results[opt.name] = opt.rank;
		});
		if (areValuesUnique(results)) {
			castVote(results);
		} else {
			alert("Each option must have a unique rank.");
		}
	}

	function incRank(name) {
		options[name].rank += 1;
		setOptions(options);
	}

	function decRank(name) {
		options[name].rank -= 1;
		setOptions(options);
	}

	return (
		<>
			<p class="instructionText">
				Please rank all the choices in order of preference, with 1 being the
				most prefered option.
			</p>
			<form action="javascript:submitBallot()">
				{options.forEach((opt) => {
					return (
						<>
							pollOption(opt.name, opt.rank, incRank, decRank)
							<br />
						</>
					);
				})}
				;
				<input class="buttonInput" type="submit" value="Cast vote" />
			</form>
		</>
	);
}

export { Poll };
