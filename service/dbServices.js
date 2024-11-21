import MongoClient from "mongodb";
import { config } from "./dbConfig.js";
const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const dbName = "STVOnline";

async function pingDB() {
	try {
		const client = new MongoClient(url);
		const db = client.db(dbName);
		await client.connect();
		await db.command({ ping: 1 });
		console.log("Successfully pinged database.");
	} catch (err) {
		console.dir(err);
	} finally {
		await client.close();
	}
}

function readFromDB(collection, query) {
	const client = new MongoClient(url);
	const db = client.db(dbName);
	return db.collection(collection).find(query);
}

function writeToDB(collection, query, update) {
	const client = new MongoClient(url);
	const db = client.db(dbName);
	db.collection(collection).updateOne(query, update, { upsert: true });
}

function deleteFromDB(collection, query) {
	const client = new MongoClient(url);
	const db = client.db(dbName);
	db.collection(collection).deleteMany(query);
}

function mintToken(token) {
	writeToDB("tokens", { id: token.id }, { $set: token });
}

async function fetchToken(tokenID, callback) {
	var tokenCursor = readFromDB("tokens", { id: tokenID });
	if (await tokenCursor.hasNext()) {
		callback(await tokenCursor.next());
	} else {
		callback(undefined);
	}
}

function patchToken(tokenID, newData) {
	writeToDB("tokens", { id: tokenID }, { $set: { ...newData, id: tokenID } });
}

function voidToken(tokenID) {
	deleteFromDB("tokens", {
		$or: [{ id: tokenID }, { expiration: { $lt: Date.now() } }],
	});
}

function addUser(user) {
	writeToDB("users", { name: user.name }, { $set: user });
	writeToDB(
		"participation",
		{ name: user.name },
		{ $set: { name: user.name, polls: [] } },
	);
}

async function fetchUser(username, callback) {
	var userCursor = readFromDB("users", { name: username });
	if (await userCursor.hasNext()) {
		callback(await userCursor.next());
	} else {
		callback(undefined);
	}
}

function addPoll(poll) {
	writeToDB(
		"polls",
		{ id: poll.id },
		{
			$set: {
				...poll,
				ballots: [],
			},
		},
	);
}

function patchPoll(pollID, newData) {
	writeToDB("polls", { id: pollID }, { $set: { ...newData, id: pollID } });
}

async function fetchPoll(pollID, callback) {
	var pollCursor = readFromDB("polls", { id: pollID });
	if (await pollCursor.hasNext()) {
		callback(await pollCursor.next());
	} else {
		callback(undefined);
	}
}

async function fetchRegistrationInfo(registrationNumber, callback) {
	var registrationCursor = readFromDB("registration", {
		number: registrationNumber,
	});
	if (await registrationCursor.hasNext()) {
		callback(await registrationCursor.next());
	} else {
		callback(undefined);
	}
}

function patchRegistrationInfo(registrationNumber, newData) {
	writeToDB(
		"registration",
		{ numer: registrationNumber },
		{ $set: { ...newData, number: registrationNumber } },
	);
}

function addRegistrationInfo(number, info) {
	writeToDB(
		"registration",
		{ number: number },
		{ $set: { ...info, number: number } },
	);
}

async function fetchParticipation(username, callback) {
	var participationCursor = readFromDB("participation", { name: username });
	if (await participationCursor.hasNext()) {
		callback(await participationCursor.next());
	} else {
		callback(undefined);
	}
}

function patchParticipation(username, newData) {
	writeToDB(
		"participation",
		{ name: username },
		{ $set: { ...newData, name: username } },
	);
}

export {
	mintToken,
	fetchToken,
	patchToken,
	voidToken,
	addUser,
	fetchUser,
	addPoll,
	patchPoll,
	fetchPoll,
	fetchRegistrationInfo,
	patchRegistrationInfo,
	addRegistrationInfo,
	fetchParticipation,
	patchParticipation,
	pingDB,
};
