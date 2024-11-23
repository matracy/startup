import { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { pollSumary } from "../components/pollSumary";
import { fetchPolls } from "../backendInterface";
import { GlobalState } from "../main";

function Account() {
	const authToken = useContext(GlobalState).authToken;
	if (!authToken) {
		return <Navigate to="/" replace />;
	}
	const [pollList, setPollList] = useState([]);
	useEffect(() => {
		fetchPolls(authToken, (info) => {
			setPollList(info);
		});
	}, [authToken]);
	return (
		<>
			<div>
				<h2 className="sectionTitle">Past polls</h2>
				<table>{pollList.map(pollSumary)}</table>
			</div>
			<div>
				<Link className="imitationButton" to="/createPoll.html">
					Create new poll
				</Link>
			</div>
			<div>
				<Link className="imitationButton" to="/registerInPoll.html">
					Register to vote
				</Link>
			</div>
		</>
	);
}

export { Account };
