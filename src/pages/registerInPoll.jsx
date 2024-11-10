import { registerToVote } from "../backendInterface";

function register() {
	registerToVote(Document.registration.pollID.value);
}

function registerInPoll() {
	return (
		<>
			<form name="registration" action="javascript:register()">
				<label for="pollID">Poll ID:</label>
				<input
					class="textInput"
					type="text"
					id="pollID"
					name="pollID"
					required
				/>
				<br />
				<input class="buttonInput" type="submit" value="Register" />
			</form>
		</>
	);
}

export { registerInPoll };
