const express = require('express')
const cors = require('cors')
const app = express()
const port = 8087

// Express parser
app.use(express.json())
app.use(cors())
app.use(express.static('../frontend'))

const counter = require('./router/counter')
app.use('/counter', counter)

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`)
})