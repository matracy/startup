import { WebsocketWrapper } from "../websocketWrapper";
import { useContext, useState } from "react";
import { GlobalState } from "../main";

function isSignedIn() {
	const name = useContext(GlobalState).name;
	const token = useContext(GlobalState).authToken;
	return !(!name || !token);
}

function EchoBox() {
	const [echoResponse, setEchoResponse] = useState();
	if (isSignedIn()) {
		var soc = useContext(GlobalState).echoSocket;
		if (!soc) {
			soc = new WebsocketWrapper(setEchoResponse);
		}
		return (
			<>
				<form
					name="EchoBox"
					onSubmit={(e) => {
						e.preventDefault();
						soc.send(JSON.stringify(userMessage.value));
					}}
				>
					<input
						className="textInput"
						type="text"
						id="userMessage"
						name="userMessage"
					/>
					<input className="buttonInput" type="submit" value="Send" />
				</form>
				<p>{echoResponse}</p>
			</>
		);
	} else {
		return <></>;
	}
}

export { EchoBox };
