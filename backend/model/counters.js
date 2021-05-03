const db = require('./db')

const counterCollection = 'counter'
const counters = {
	onlyOneCreatedAtTheMoment: 0
}

const schema = (operation, previousCount, newCount) => {
	return {
		operation,
		previousCount,
		newCount,
		timeStamp: new Date
	}
}

async function init() {
	const collection = await db.getCollection(counterCollection)
	const cursor = collection.find().sort({ "timeStamp": -1 }).limit(1)
	const result = await cursor.toArray()
	counters.onlyOneCreatedAtTheMoment = result[0].newCount
	console.log("model/counters init():", result[0])
	return result[0]
}

async function updateDb(newDbObject) {
	const collection = await db.getCollection(counterCollection)
	collection.insertOne(newDbObject)
}

function update(ops) {
	const oldCount = counters.onlyOneCreatedAtTheMoment
	const newCount = oldCount + ops
	counters.onlyOneCreatedAtTheMoment = newCount
	const operation = ops > 0
		? "increase"
		: "decrease"
	const newDbObject = schema(operation, oldCount, newCount)
	if (ops !== 0) updateDb(newDbObject)

	return newCount
}

module.exports = {
	init,
	update
}