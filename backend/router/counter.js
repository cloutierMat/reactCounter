const router = require('express').Router()
const counters = require('../model/counters')

router.post('/increase', (req, res) => {
	const user = {
		store: req.body.store,
		pos: req.body.pos
	}
	const count = counters.update(1, user)
	console.log("counter/increase", count)
	res.send(count)
})

router.post('/decrease', (req, res) => {
	const user = {
		store: req.body.store,
		pos: req.body.pos
	}
	const count = counters.update(-1, user)
	console.log("counter/decrease", count)
	res.send(count)
})

router.get('/:store', async (req, res) => {
	const store = req.params.store
	const count = await counters.getCount(store)
	console.log("counter/:store", count)

	res.send(count)
})

module.exports = router