import { useState } from "react";
import { fetchResults } from "../backendInterface";

function pollResults({ poll }) {
	const [resultView, setResultView] = useState("Final Votes");
	var results = fetchResults(poll);

	function setResultView() {
		resultView = resultView == "Final Votes" ? "Initial Votes" : "Final Votes";
	}

	return (
		<>
			<main>
				{/* <!-- Essentially this whole page will be stored on the server's database. --> */}
				<p class="preTitle">The winner of this poll is:</p>
				<br />
				<h1 class="pollWinner">{poll.winner}</h1>
				<p class="imitationButton" onClick={setResultView}>
					View {resultView == "Final Votes" ? "initial votes" : "final votes"}
				</p>
				{results.forEach((res) => {
					return (
						<>
							pollResult(res.name,
							{resultView == "Initial Votes"
								? res.initialVotes
								: res.finalVotes}
							)
							<br />
						</>
					);
				})}
			</main>
		</>
	);
}

export { pollResults };
