import { pollSumary } from "../components/pollSumary";

function Account({ polls }) {
	return (
		<>
			<div>
				<h2 className="sectionTitle">Past polls</h2>
				<table>polls.forEach(pollSumary)</table>
			</div>
			<div>
				<a className="imitationButton" href="./createPoll.html">
					Create new poll
				</a>
			</div>
			<div>
				<a className="imitationButton" href="./registerInPoll.html">
					Register to vote
				</a>
			</div>
		</>
	);
}

export { Account };
