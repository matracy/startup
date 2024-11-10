import { registerToVote } from "../backendInterface";

function register() {
	registerToVote(Document.registration.pollID.value);
}

function RegisterInPoll() {
	return (
		<>
			<form name="registration" action="javascript:register()">
				<label htmlFor="pollID">Poll ID:</label>
				<input
					className="textInput"
					type="text"
					id="pollID"
					name="pollID"
					required
				/>
				<br />
				<input className="buttonInput" type="submit" value="Register" />
			</form>
		</>
	);
}

export { RegisterInPoll };
