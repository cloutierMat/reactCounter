const db = require('./backend/model/db')
const counters = require('./backend/model/counters')

async function test() {
	await counters.getCount("mine")
	counters.update(1, { store: "mine", pos: 0 })
}

// async function test() {
// 	const coll = await db.getCollection("mine")
// }

test()