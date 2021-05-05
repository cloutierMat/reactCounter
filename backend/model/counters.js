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
// set value to 0 if no db collections exists
async function getCount(store) {
	// returns immediately if a instance of the stores already exists
	if (storeCounters[store]) return {
		status: "Connected to server",
		count: storeCounters[store]
	}
	// 
	try {
		const result = await db.findLastOrCreate(store)
		storeCounters[store] = result.count
		return result
	} catch (error) {
		console.log("model/counters.js failed to getCount for:", store)
	}
}

// 
// updates the servers status for a store
// then calls the db to add new log
// 
function update(operation, user) {
	const { store, pos } = user
	if (!Object.keys(storeCounters).includes(store)) {
		return { status: "You need to connect your store to the server" }
	}

	const oldCount = storeCounters[store]
	const newCount = oldCount + operation
	operation = operation > 0
		? "increase"
		: "decrease"
	const newDbObject = schema(operation, oldCount, newCount, pos)
	if (operation !== 0) db.insertOne(newDbObject, store)

	storeCounters[store] = newCount
	return { status: "Connected to server", count: newCount }
}

module.exports = {
	update,
	getCount
}