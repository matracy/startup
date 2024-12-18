import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "../datepicker.css";
import { pollOption } from "../components/pollOption";
import { registerPoll } from "../backendInterface";
import { GlobalState } from "../main";

function CreatePoll({ redirecter }) {
	const authToken = useContext(GlobalState).authToken;
	if (!authToken) {
		return <Navigate to="/" replace />;
	}
	const navigateTo = useNavigate();
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [options, setOptions] = useState([]);
	const [settings, setSettings] = useState({
		name: "My Poll",
		startDate: null,
		endDate: null,
		maxVoters: 5,
		allowUnlimitedVoters: false,
	});

	function addOption() {
		var newOpts = [...options];
		newOpts.push(pollOptions.addOption.value);
		setOptions(newOpts);
		pollOptions.addOption.value = "";
	}

	function saveSettings() {
		settings.name = pollSettings.pollName.value;
		settings.maxVoters = pollSettings.voterCount.value;
		settings.startDate = startDate;
		settings.endDate = endDate;
		settings.allowUnlimitedVoters = pollSettings.unlimitedRegistration.checked;
		setSettings(settings);
	}

	function launchPoll() {
		if (pollLaunchConfirmation.launchConfirmation.checked) {
			saveSettings();
			registerPoll(options, settings, authToken, redirecter);
		}
	}

	return (
		<>
			{/* <!-- The poll options and settings will be pulled from the server in realtime with a websocket --> */}
			<h1 className="sectionTitle">Poll Options</h1>
			<ul>
				{options.map((opt) => {
					return (
						<>
							<li key={opt.name}>{pollOption(opt, null, null, null)}</li>
						</>
					);
				})}
			</ul>
			<form
				name="pollOptions"
				onSubmit={(e) => {
					e.preventDefault();
					addOption();
				}}
			>
				<label htmlFor="addOption">Add option</label>
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
			<form
				name="pollSettings"
				onSubmit={(e) => {
					e.preventDefault();
					saveSettings();
				}}
			>
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
				<DatePicker
					className="textInput"
					id="startDateTime"
					name="startDateTime"
					selected={startDate}
					onChange={(date) => setStartDate(date)}
				/>
				<br />
				<label htmlFor="endDateTime">Voting closes: </label>
				<DatePicker
					className="textInput"
					id="endDateTime"
					name="endDateTime"
					selected={endDate}
					onChange={(date) => setEndDate(date)}
				/>
				<br />
				<input className="buttonInput" type="submit" value="Apply" />
			</form>
			<br />
			<h1 className="sectionTitle">Launch Poll</h1>
			<form
				name="pollLaunchConfirmation"
				onSubmit={(e) => {
					e.preventDefault();
					launchPoll();
				}}
			>
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
