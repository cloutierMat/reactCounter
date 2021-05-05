const MongoClient = require('mongodb').MongoClient

const dbUrl = 'mongodb://localhost:27017'
const databaseName = 'reactCounter'

let connectMongoClient = MongoClient.connect(dbUrl, { useUnifiedTopology: true })

let getDb = connectMongoClient.then((client) => {
	return client.db(databaseName)
})

function getCollection(name) {
	return getDb.then((db) => { return db.collection(name) })
}

function close() {
	return connectMongoClient.then((client) => {
		return client.close()
	})
}

//
// add entry to the database
//
async function insertOne(newDbObject, collection) {
	try {
		const coll = await getCollection(collection)
		const result = await coll.insertOne(newDbObject)
		const { operation, pos, newCount } = result.ops[0]
		console.log(`Added a new operation to db store: ${collection} pos: ${pos} operation: ${operation} newCount: ${newCount}`)
	} catch (error) {
		console.log("model/db.js insertOne() unable to add entry to :", collection)
	}
}

//
// find the latest count for a store
// create a new collection if no stores exists
//
async function findLastOrCreate(store) {
	try {
		const coll = await getCollection(store)
		const cursor = coll.find().sort("timeStamp", -1).limit(1)
		const result = await cursor.toArray()
		// if the store exists return it's value
		if (result.length) {
			return {
				status: "connected to db",
				count: result[0].newCount
			}
		}
		// create a new entry if the stores doesn't already exists.
		const initialization = {
			operation: "Store creation",
			newCount: 0,
			timeStamp: new Date
		}
		await insertOne(initialization, store)
		return {
			status: "new store added to db",
			count: 0
		}
	} catch (error) {
		console.log("model/db.js findLastOrCreate trouble connecting to db for store:", store)
		console.log(error)
		return {
			status: "Couldn't connect to db"
		}
	}
}


module.exports = {
	getDb,
	getCollection,
	close,
	findLastOrCreate,
	insertOne
}