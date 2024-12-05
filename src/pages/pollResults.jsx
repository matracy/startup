import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { fetchResults } from "../backendInterface";
import { pollResult } from "../components/pollResult";
import { GlobalState } from "../main";

function PollResults() {
	const poll = useContext(GlobalState).pollID;
	if (!poll) {
		return <Navigate to="/" replace />;
	}
	const [resultView, setResultView] = useState("Final Votes");
	const [results, setResults] = useState([]);
	const [totalVotes, setTotalVotes] = useState(0);
	const [winner, setWinner] = useState("");
	useEffect(() => {
		fetchResults(poll, (res) => {
			setResults(res);
		});
	}, [poll]);

	useEffect(() => {
		var votes = 0;
		results.forEach((res) => {
			votes += res.initialVotes;
		});
		setTotalVotes(votes);
		var currWinner = results.reduce(
			(acc, opt) => {
				if (opt.finalVotes > acc.numVotes) {
					return { name: opt.name, numVotes: opt.finalVotes };
				} else {
					return acc;
				}
			},
			{ name: "", numVotes: -1 },
		);
		setWinner(currWinner.name);
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
			<h1 className="pollWinner">{winner}</h1>
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
