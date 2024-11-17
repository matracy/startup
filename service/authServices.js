import {
	mintToken,
	fetchToken,
	patchToken,
	voidToken,
	addUser,
	fetchUser,
} from "./dbServices.js";
import { v4 } from "uuid";

function validateToken(token) {
	const { expiration } = fetchToken(token);
	if (!expiration || expiration < Date.now()) {
		return false;
	}
	if (expiration - Date.now() < 10 * 60 * 1000) {
		patchToken(token, { expiration: Date.now() + 3600 * 1000 });
	}
	return true;
}

function issueToken(name) {
	const token = { name: name, expiration: Date.now() + 3600 * 1000, id: v4() };
	mintToken(token);
	return token.id;
}

function revokeToken(token) {
	voidToken(token);
}

function getUser(token) {
	const { name } = fetchToken(token);
	return name;
}

function authUser(name, password) {
	const { storedPassword } = fetchUser(name);
	if (!storedPassword || password != storedPassword) {
		return false;
	}
	return true;
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
