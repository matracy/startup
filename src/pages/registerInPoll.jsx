import { useNavigate } from "react-router-dom";
import { registerToVote } from "../backendInterface";

function RegisterInPoll({ redirecter, authToken }) {
	return (
		<>
			<form
				name="registration"
				onSubmit={(e) => {
					e.preventDefault();
					redirecter(
						registerToVote(registration.registrationNumber.value, authToken),
					);
				}}
			>
				<label htmlFor="registrationNumber">Registration Number:</label>
				<input
					className="textInput"
					type="text"
					id="registrationNumber"
					name="registrationNumber"
					required
				/>
				<br />
				<input className="buttonInput" type="submit" value="Register" />
			</form>
		</>
	);
}

export { RegisterInPoll };
