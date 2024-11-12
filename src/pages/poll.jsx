import { useState } from "react";
import { fetchOptions, castVote } from "../backendInterface";
import { pollOption } from "../components/pollOption";

function areValuesUnique(obj) {
	const values = Object.values(obj);
	const uniqueValues = new Set(values);
	return values.length === uniqueValues.size;
}

function Poll({ poll, redirecter }) {
	const [options, setOptions] = useState(() => fetchOptions(poll));

	function submitBallot() {
		var results = {};
		options.map((opt) => {
			results[opt.name] = opt.rank;
		});
		if (areValuesUnique(results)) {
			castVote(results);
			redirecter();
		} else {
			alert("Each option must have a unique rank.");
		}
	}

	function incRank(name) {
		var newOpts = [...options];
		newOpts.forEach((opt) => {
			opt.name == name ? (opt.rank += 1) : (opt.rank += 0);
		});
		setOptions(newOpts);
	}

	function decRank(name) {
		var newOpts = [...options];
		newOpts.forEach((opt) => {
			opt.name == name ? (opt.rank -= 1) : (opt.rank -= 0);
		});
		setOptions(newOpts);
	}

	return (
		<>
			<p className="instructionText">
				Please rank all the choices in order of preference, with 1 being the
				most prefered option.
			</p>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					submitBallot();
				}}
			>
				<ul>
					{options.map((opt) => {
						if (opt != null && opt != undefined) {
							return (
								<>
									<li key={opt.name}>
										{pollOption(opt.name, opt.rank, incRank, decRank)}
									</li>
								</>
							);
						}
					})}
				</ul>
				<input className="buttonInput" type="submit" value="Cast vote" />
			</form>
		</>
	);
}

export { Poll };
