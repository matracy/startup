import { authenticateUser } from "../backendInterface";

function signIn({ notifyStateOfNewUser }) {
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
				<input class="buttonInput" type="submit" value="Log in" />
			</form>
		</>
	);
}

export { signIn };
