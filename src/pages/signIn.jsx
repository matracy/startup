import { authenticateUser } from "../backendInterface";

function authUser(callback) {
	var credentials = {};
	credentials.username = signin.name.value;
	credentials.password = signin.password.value;
	authenticateUser(credentials, callback);
}

function SignIn({ notifyStateOfNewUser }) {
	return (
		<>
			<form
				name="signin"
				onSubmit={(e) => {
					e.preventDefault();
					authUser(notifyStateOfNewUser);
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
				<input className="buttonInput" type="submit" value="Log in" />
			</form>
		</>
	);
}

export { SignIn };
