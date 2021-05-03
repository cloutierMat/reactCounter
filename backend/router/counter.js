const router = require('express').Router()
const counters = require('../model/counters')
counters.init()

router.get('/increase', (req, res) => {
	const count = { count: counters.update(1) }
	res.send(count)
})
router.get('/decrease', (req, res) => {
	const count = { count: counters.update(-1) }
	res.send(count)
})

module.exports = router