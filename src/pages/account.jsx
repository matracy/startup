import { Link } from "react-router-dom";
import { pollSumary } from "../components/pollSumary";

function Account({ polls }) {
	return (
		<>
			<div>
				<h2 className="sectionTitle">Past polls</h2>
				<table>{polls.map(pollSumary)}</table>
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
