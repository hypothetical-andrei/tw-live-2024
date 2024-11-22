const express = require('express')

const app = express()

app.get('/ping', (req, res) => {
	res.status(200).send('ok')
})

app.listen(8080)