import { pollSumary } from "../components/pollSumary";

function Account({ polls }) {
	return (
		<>
			<div>
				<h2 class="sectionTitle">Past polls</h2>
				<table>polls.forEach(pollSumary)</table>
			</div>
			<div>
				<a class="imitationButton" href="./createPoll.html">
					Create new poll
				</a>
			</div>
			<div>
				<a class="imitationButton" href="./registerInPoll.html">
					Register to vote
				</a>
			</div>
		</>
	);
}

export { Account };
