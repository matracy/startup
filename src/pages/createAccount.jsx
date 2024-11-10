import { registerNewUser } from "../backendInterface";

function createAccount({ notifyStateOfNewUser }) {
	return (
		<>
			<form ction="javascript:registerNewUser({ notifyStateOfNewUser })">
				<label for="name">Display name:</label>
				<input class="textInput" type="text" id="name" name="name" required />
				<br />
				<label for="password">Password:</label>
				<input
					class="textInput"
					type="password"
					id="password"
					name="password"
					required
				/>
				<br />
				<label for="confirmPassword">Confirm Password:</label>
				<input
					class="textInput"
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					required
				/>
				<br />
				<input class="buttonInput" type="submit" value="Register" />
			</form>
		</>
	);
}

export { createAccount };
