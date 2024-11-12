import { useState } from "react";
import { fetchResults } from "../backendInterface";
import { pollResult } from "../components/pollResult";

function PollResults({ poll }) {
	const [resultView, setResultView] = useState("Final Votes");
	var results = fetchResults(poll);
	var totalVotes = 0;
	results.forEach((res) => {
		totalVotes += res.initialVotes;
	});

	function toggleResultView() {
		setResultView(
			resultView == "Final Votes" ? "Initial Votes" : "Final Votes",
		);
	}

	return (
		<>
			{/* <!-- Essentially this whole page will be stored on the server's database. --> */}
			<p className="preTitle">The winner of this poll is:</p>
			<br />
			<h1 className="pollWinner">{poll.result}</h1>
			<p className="imitationButton" onClick={toggleResultView}>
				View {resultView == "Final Votes" ? "initial votes" : "final votes"}
			</p>
			{results.map((res) => {
				return (
					<>
						{pollResult(
							res.name,
							(resultView == "Initial Votes"
								? res.initialVotes
								: res.finalVotes) / totalVotes,
						)}
						<br />
					</>
				);
			})}
		</>
	);
}

export { PollResults };
