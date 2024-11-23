import {
	mintToken,
	fetchToken,
	patchToken,
	voidToken,
	addUser,
	fetchUser,
} from "./dbServices.js";
import { v4 } from "uuid";

function validateToken(token, callback) {
	// making a request with no token can result in the being called with the string "undefined", and we also want to guard against the value `undefined`
	if (token + "" == "undefined") {
		callback(false);
	} else {
		fetchToken(token, ({ expiration }) => {
			if (!expiration || expiration < Date.now()) {
				callback(false);
			}
			if (expiration - Date.now() < 10 * 60 * 1000) {
				patchToken(token, { expiration: Date.now() + 3600 * 1000 });
			}
			callback(true);
		});
	}
}

function issueToken(name) {
	const token = { name: name, expiration: Date.now() + 3600 * 1000, id: v4() };
	mintToken(token);
	return token.id;
}

function revokeToken(token) {
	voidToken(token);
}

function getUser(token, callback) {
	fetchToken(token, ({ name }) => {
		callback(name);
	});
}

function authUser(name, providedPassword, callback) {
	fetchUser(name, ({ password }) => {
		if (!password || password != providedPassword) {
			callback(false);
		} else {
			callback(true);
		}
	});
}

function registerUser(name, password) {
	addUser({ name: name, password: password });
}

export {
	validateToken,
	issueToken,
	revokeToken,
	getUser,
	authUser,
	registerUser,
};
