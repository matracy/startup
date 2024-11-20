import { useState, useEffect, useContext } from "react";
import { fetchResults } from "../backendInterface";
import { pollResult } from "../components/pollResult";
import { GlobalState } from "../main";

function PollResults() {
	const poll = useContext(GlobalState).pollID;
	const [resultView, setResultView] = useState("Final Votes");
	const [results, setResults] = useState([]);
	const [totalVotes, setTotalVotes] = useState(0);
	useEffect(() => {
		fetchResults(poll, (res) => {
			setResults(res);
		});
		var votes = 0;
		results.forEach((res) => {
			votes += res.initialVotes;
		});
		setTotalVotes(votes);
	}, [results]);

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
