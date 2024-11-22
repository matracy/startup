import { writeFile } from "fs";

const interval = 2 * 60 * 1000; // refresh every two minutes (timing of imitation curl command showed 1.6 minute wait)
const filename = "dynamic-colors.css";
const fileRelPath = "./public/"; //NOTE: must end in '/'

const fileWarningHeader = `/*
* WARNING:
* This file is dynamically regenerated every ${interval}ms as the backend calls the colormind.io API.
* Any changes made here will be overwritten.
*/`;

function convertColorResponseToStringList(colorResponse) {
	var res = [];
	var hexPairs = [];
	Object.keys(colorResponse).forEach((key) => {
		const color = colorResponse[key];
		color.forEach((chanel) => {
			hexPairs.push(chanel.toString(16));
		});
	});
	for (let pos = 0; pos < hexPairs.length / 3; pos++) {
		let start = pos * 3;
		res.push([hexPairs[start] + hexPairs[start + 1] + hexPairs[start + 2]]);
	}
	return res;
}

async function regenerateColors() {
	try {
		const response = await fetch("http://colormind.io/api/", {
			method: "POST",
			headers: {
				"User-Agent": " curl/8.5.0",
				Accept: "*/*",
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: '{"model":"ui"}',
		});
		//example result:
		// {"result":[[246,247,244],[145,119,90],[115,153,163],[107,84,80],[62,66,75]]}
		// For some reason, the code sees the above as 246, 247, 244, 145, 119, 90, 115, 153, 163, 107, 84, 80, 62, 66, 75

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const colors = await response.json();
		const colorStrings = convertColorResponseToStringList(colors.result);

		const body = `:root {
			--primaryColor: #${colorStrings[0]};
			--mainAccentColor: #${colorStrings[1]};
			--secondayrAccentColor: #${colorStrings[2]};
			--defaultText: #${colorStrings[3]};
}`;

		writeFile(
			`${fileRelPath}${filename}`,
			`${fileWarningHeader}\n${body}`,
			(err) => {
				if (err) {
					console.log(`Error writing colors out to CSS file: ${err}`);
				}
			},
		);
	} catch (error) {
		console.log(`Error getting color palette from colormind.io: ${error}`);
	}
}

async function colorMagic() {
	const timer = setInterval(async () => {
		regenerateColors();
	}, interval);
	timer.unref(); //don't hold things open if this is the only timer in the module that hasn't fired yet
	return timer;
}

export { colorMagic };
