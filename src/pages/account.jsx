import { pollSumary } from "../components/pollSumary";

function account({ polls }) {
	return (
		<>
			<main>
				<div>
					<h2 class="sectionTitle">Past polls</h2>
					<table>polls.forEach(pollSumary)</table>
				</div>
				<div>
					<a class="imitationButton" href="./newPoll.html">
						Create new poll
					</a>
				</div>
				<div>
					<a class="imitationButton" href="./registerInPoll.html">
						Register to vote
					</a>
				</div>
			</main>
		</>
	);
}

export { account };
