import { registerNewUser } from "../backendInterface";

function registerUser(callback) {
	if (register.password.value == register.confirmPassword.value) {
		var credentials = {};
		credentials.username = register.name.value;
		credentials.password = register.password.value;
		registerNewUser(credentials, callback);
	} else {
		alert("Passwords must match.");
	}
}

function CreateAccount({ notifyStateOfNewUser }) {
	return (
		<>
			<form
				name="register"
				onSubmit={(e) => {
					e.preventDefault();
					registerUser(notifyStateOfNewUser);
				}}
			>
				<label htmlFor="name">Display name:</label>
				<input
					className="textInput"
					type="text"
					id="name"
					name="name"
					required
				/>
				<br />
				<label htmlFor="password">Password:</label>
				<input
					className="textInput"
					type="password"
					id="password"
					name="password"
					required
				/>
				<br />
				<label htmlFor="confirmPassword">Confirm Password:</label>
				<input
					className="textInput"
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					required
				/>
				<br />
				<input className="buttonInput" type="submit" value="Register" />
			</form>
		</>
	);
}

export { CreateAccount };
