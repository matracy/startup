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

function authUser(name, password, callback) {
	fetchUser(name, ({ storedPassword }) => {
		if (!storedPassword || password != storedPassword) {
			callback(false);
		}
		callback(true);
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
