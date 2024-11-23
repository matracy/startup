import { MongoClient } from "mongodb";
import { config } from "./dbConfig.js";
const dbURL = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const dbName = "STVOnline";

class DBSingleton {
	constructor(url, name) {
		if (DBSingleton._instance) {
			return DBSingleton._instance;
		}
		DBSingleton._instance = this;
		this.client = new MongoClient(url);
		this.connection = this.client.db(name);
		this.client.connect();
	}

	getClient() {
		return this.client;
	}
}

const dbInstance = new DBSingleton(dbURL, dbName);

async function pingDB() {
	const client = dbInstance.getClient();
	try {
		const db = client.db(dbName);
		await client.connect();
		await db.command({ ping: 1 });
		console.log("Successfully pinged database.");
	} catch (err) {
		console.dir(err);
	}
}

function readFromDB(collection, query, resultHandler) {
	const client = dbInstance.getClient();
	try {
		const db = client.db(dbName);
		resultHandler(db.collection(collection).find(query));
	} catch (err) {
		conosle.log(`Error reading from database: ${err}`);
	}
}

function writeToDB(collection, query, update) {
	const client = dbInstance.getClient();
	try {
		const db = client.db(dbName);
		db.collection(collection).updateOne(query, update, { upsert: true });
	} catch (err) {
		conosle.log(`Error writing to database: ${err}`);
	}
}

function deleteFromDB(collection, query) {
	const client = new MongoClient(url);
	try {
		const db = client.db(dbName);
		db.collection(collection).deleteMany(query);
	} catch (err) {
		conosle.log(`Error deleting from database: ${err}`);
	} finally {
		client.close();
	}
}

function mintToken(token) {
	writeToDB("tokens", { id: token.id }, { $set: token });
}

async function fetchToken(tokenID, callback) {
	readFromDB("tokens", { id: tokenID }, async (tokenCursor) => {
		if (await tokenCursor.hasNext()) {
			callback(await tokenCursor.next());
		} else {
			callback(undefined);
		}
	});
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
	readFromDB("users", { name: username }, async (userCursor) => {
		if (await userCursor.hasNext()) {
			callback(await userCursor.next());
		} else {
			callback(undefined);
		}
	});
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
	readFromDB("polls", { id: pollID }, async (pollCursor) => {
		if (await pollCursor.hasNext()) {
			callback(await pollCursor.next());
		} else {
			callback(undefined);
		}
	});
}

async function fetchRegistrationInfo(registrationNumber, callback) {
	readFromDB(
		"registration",
		{
			number: registrationNumber,
		},
		async (registrationCursor) => {
			if (await registrationCursor.hasNext()) {
				callback(await registrationCursor.next());
			} else {
				callback(undefined);
			}
		},
	);
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
	readFromDB(
		"participation",
		{ name: username },
		async (participationCursor) => {
			if (await participationCursor.hasNext()) {
				callback(await participationCursor.next());
			} else {
				callback(undefined);
			}
		},
	);
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
