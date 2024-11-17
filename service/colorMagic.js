const { fs } = require("fs");

const interval = 60 * 1000; // refresh every minute
const filename = "dynamic-colors.css";
const fileRelPath = "./public/"; //NOTE: must end in '/'

const fileWarningHeader = `/*
* WARNING:
* This file is dynamically regenerated every ${interval}ms as the backend calls the colormind.io API.
* Any changes made here will be overwritten.
*/`;

function convertRGBListToHexString(lst) {
	var res = "";
	lst.forEach((channel) => {
		res += channel.toStrning(16);
	});
	return res;
}

function convertColorListToStringList(lst) {
	var res = [];
	lst.forEach((color) => {
		res.push(convertRGBListToHexString(color));
	});
	return res;
}

async function regenerateColors() {
	try {
		const colorResponse = awaitfetch("http://colormind.io/api/", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: '{"model":"ui"}',
		});
		//example result:
		// {"result":[[246,247,244],[145,119,90],[115,153,163],[107,84,80],[62,66,75]]}

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const colors = await response.json()["result"];
		const colorStrings = convertColorListToStringList(colors);

		const body = `:root {
			--primaryColor: #${colorStrings[0]};
			--mainAccentColor: #${colorStrings[1]};
			--secondayrAccentColor: #${colorStrings[2]};
			--defaultText: #${colorStrings[3]};
}`;

		fs.writeFile(
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
}

module.exports = { colorMagic };
