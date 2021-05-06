const db = require('./db')

const storeCounters = {}

//
// schema for data storing in the db
//
const schema = (operation, previousCount, newCount, pos = 0) => {
	return {
		operation,
		previousCount,
		newCount,
		pos,
		timeStamp: new Date
	}
}

//
// get current count from server's data
// get from db if not initiated
//
async function getCount(store) {
	// returns immediately if a instance of the stores already exists
	const newCounter = storeCounters[store]
	if (newCounter) return newCounter
	// 
	try {
		const result = await db.findLast(store)
		Object.assign(result, { serverStatus: "Online" })
		storeCounters[store] = result
		return result
	} catch (error) {
		console.log("model/counters.js failed to getCount for:", store)
		return {
			serverStatus: "Online",
			dbStatus: "Store doesn't exist"
		}
	}
}

// 
// updates the serverStatus for a store
// then calls the db to add new log
// 
function update(operation, user) {
	const { store, pos } = user
	// Get out if store isn't already connected
	if (!Object.keys(storeCounters).includes(store)) {
		return { serverStatus: "You need to connect your store to the server" }
	}

	const oldCount = storeCounters[store].count
	const newCount = oldCount + operation
	operation = operation > 0
		? "increase"
		: "decrease"
	const newDbObject = schema(operation, oldCount, newCount, pos)
	if (operation !== 0) db.insertOne(newDbObject, store)

	Object.assign(storeCounters[store], { count: newCount, serverStatus: "Online" })

	return storeCounters[store]
}

module.exports = {
	update,
	getCount
}