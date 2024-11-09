import { useState } from "react";
import { pollOption } from "../components/pollOption";
import { registerPoll } from "../backendInterface";

function createPoll() {
	const [options, setOptions] = useState([]);
	const [settings, setSettings] = useState({
		name: "My Poll",
		startDate: null,
		endDate: null,
		maxVoters: 5,
		allowUnlimitedVoters: false,
	});

	function addOption() {
		options.push(Document.options.addOption.value);
		setOptions(options);
	}

	function saveSettings() {
		settings.name = Document.pollSettings.pollName.value;
		settings.maxVoters = Document.pollSettings.voterCount.value;
		settings.startDate = Document.pollSettings.startDateTime.value;
		settings.endDate = Document.pollSettings.endDateTime.value;
		settings.allowUnlimitedVoters =
			Document.pollSettings.unlimitedRegistration.value;
		setSettings(settings);
	}

	function launchPoll() {
		if (Document.pollLaunchConfirmation.launchConfirmation.value) {
			registerPoll(options, settings);
		}
	}

	return (
		<>
			<main>
				{/* <!-- The poll options and settings will be pulled from the server in realtime with a websocket --> */}
				<h1 class="sectionTitle">Poll Options</h1>
				<ul>
					{options.forEach((opt) => {
						return (
							<>
								<li>pollOption(opt, null, null, null)</li>
							</>
						);
					})}
				</ul>
				<form name="options" action="javascript:addOption()">
					<label for="newOption">Add option</label>
					<input
						class="textInput"
						type="text"
						id="addOption"
						name="addOption"
					/>
					<input class="buttonInput" type="submit" value="Add" />
				</form>
				<br />
				<h1 class="sectionTitle">Poll Settings</h1>
				<form name="pollSettings" action="javascript:saveSettings()">
					<label for="pollName">Poll Name: </label>
					<input class="textInput" type="text" id="pollName" name="pollName" />
					<br />
					<label for="voterCount">Maximum number of voters: </label>
					<input
						class="textInput"
						type="number"
						id="voterCount"
						name="voterCount"
						step="1"
						min="1"
					/>
					<br />
					<label for="unlimitedRegistration">
						Allow unlimited number of voters
					</label>
					<input
						class="toggleInput"
						type="checkbox"
						id="unlimitedRegistration"
						name="unlimitedRegistration"
					/>
					<br />
					<label for="startDateTime">Voting opens: </label>
					<input
						class="textInput"
						type="datetime"
						id="startDateTime"
						name="startDateTime"
					/>
					<br />
					<label for="endDateTime">Voting closes: </label>
					<input
						class="textInput"
						type="datetime"
						id="endDateTime"
						name="endDateTime"
					/>
					<br />
					<input class="buttonInput" type="submit" value="Apply" />
				</form>
				<br />
				<h1 class="sectionTitle">Launch Poll</h1>
				<form name="pollLaunchConfirmation" action="javascript:launchPoll()">
					<label for="launchConfirmation">
						I understand that once launched, a poll cannot be changed, and wish
						to launch this poll.
					</label>
					<input
						class="confirmInput"
						type="checkbox"
						name="launchConfirmation"
						id="launchConfirmation"
					/>
					<input class="buttonInput" type="submit" value="Launch poll" />
				</form>
			</main>
		</>
	);
}

export { createPoll };
