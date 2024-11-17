import { useContext } from "react";
import { GlobalState } from "../main";

function CodeFloat() {
	const regNum = useContext(GlobalState).registrationNumber;
	if (regNum) {
		return (
			<>
				<nav class="codeDisplay">
					<p>Registration number for current poll:</p>
					<p>
						<strong>{regNum}</strong>
					</p>
				</nav>
			</>
		);
	} else {
		return <> </>;
	}
}

module.exports = { CodeFloat };
