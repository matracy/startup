import { useState } from "react";
import { fetchResults } from "../backendInterface";

function PollResults({ poll }) {
	const [resultView, setResultView] = useState("Final Votes");
	var results = fetchResults(poll);

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
			<h1 className="pollWinner">{poll.winner}</h1>
			<p className="imitationButton" onClick={toggleResultView}>
				View {resultView == "Final Votes" ? "initial votes" : "final votes"}
			</p>
			{results.forEach((res) => {
				return (
					<>
						pollResult(res.name,
						{resultView == "Initial Votes" ? res.initialVotes : res.finalVotes}
						)
						<br />
					</>
				);
			})}
		</>
	);
}

export { PollResults };
