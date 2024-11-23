import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { registerToVote } from "../backendInterface";
import { GlobalState } from "../main";

function RegisterInPoll({ redirecter }) {
	const authToken = useContext(GlobalState).authToken;
	if (!authToken) {
		return <Navigate to="/" replace />;
	}
	return (
		<>
			<form
				name="registration"
				onSubmit={(e) => {
					e.preventDefault();
					registerToVote(
						registration.registrationNumber.value,
						authToken,
						redirecter,
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
