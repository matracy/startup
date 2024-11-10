import { useNavigate } from "react-router-dom";
import { registerToVote } from "../backendInterface";

function RegisterInPoll({ redirecter }) {
	return (
		<>
			<form
				name="registration"
				onSubmit={(e) => {
					e.preventDefault();
					registerToVote(registration.pollID.value);
					redirecter();
				}}
			>
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
