import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { fetchOptions, castVote } from "../backendInterface";
import { pollOption } from "../components/pollOption";
import { GlobalState } from "../main";

function areValuesUnique(obj) {
	const values = Object.values(obj);
	const uniqueValues = new Set(values);
	return values.length === uniqueValues.size;
}

function valueRangesAreValid(results) {
	const values = Object.values(results);
	return values.reduce((acc, val) => {
		return val >= 1 && acc;
	}, true);
}

function Poll({ redirecter }) {
	const authToken = useContext(GlobalState).authToken;
	if (!authToken) {
		return <Navigate to="/" replace />;
	}
	const poll = useContext(GlobalState).pollID;
	const [options, setOptions] = useState([]);
	useEffect(() => {
		if (poll && options.length == 0) {
			fetchOptions(poll, (opts) => {
				setOptions(opts);
			});
		}
	}, [options]);

	function submitBallot() {
		var results = {};
		options.map((opt) => {
			results[opt.name] = opt.rank;
		});
		if (areValuesUnique(results) && valueRangesAreValid(results)) {
			castVote(poll, results, authToken);
			redirecter();
		} else {
			alert("Each option must have a unique rank greater than 0.");
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
