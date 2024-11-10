import { useState } from "react";
import { pollOption } from "../components/pollOption";
import { registerPoll } from "../backendInterface";

function CreatePoll() {
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
			{/* <!-- The poll options and settings will be pulled from the server in realtime with a websocket --> */}
			<h1 className="sectionTitle">Poll Options</h1>
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
				<label htmlFor="newOption">Add option</label>
				<input
					className="textInput"
					type="text"
					id="addOption"
					name="addOption"
				/>
				<input className="buttonInput" type="submit" value="Add" />
			</form>
			<br />
			<h1 className="sectionTitle">Poll Settings</h1>
			<form name="pollSettings" action="javascript:saveSettings()">
				<label htmlFor="pollName">Poll Name: </label>
				<input
					className="textInput"
					type="text"
					id="pollName"
					name="pollName"
				/>
				<br />
				<label htmlFor="voterCount">Maximum number of voters: </label>
				<input
					className="textInput"
					type="number"
					id="voterCount"
					name="voterCount"
					step="1"
					min="1"
				/>
				<br />
				<label htmlFor="unlimitedRegistration">
					Allow unlimited number of voters
				</label>
				<input
					className="toggleInput"
					type="checkbox"
					id="unlimitedRegistration"
					name="unlimitedRegistration"
				/>
				<br />
				<label htmlFor="startDateTime">Voting opens: </label>
				<input
					className="textInput"
					type="datetime"
					id="startDateTime"
					name="startDateTime"
				/>
				<br />
				<label htmlFor="endDateTime">Voting closes: </label>
				<input
					className="textInput"
					type="datetime"
					id="endDateTime"
					name="endDateTime"
				/>
				<br />
				<input className="buttonInput" type="submit" value="Apply" />
			</form>
			<br />
			<h1 className="sectionTitle">Launch Poll</h1>
			<form name="pollLaunchConfirmation" action="javascript:launchPoll()">
				<label htmlFor="launchConfirmation">
					I understand that once launched, a poll cannot be changed, and wish to
					launch this poll.
				</label>
				<input
					className="confirmInput"
					type="checkbox"
					name="launchConfirmation"
					id="launchConfirmation"
				/>
				<input className="buttonInput" type="submit" value="Launch poll" />
			</form>
		</>
	);
}

export { CreatePoll };
