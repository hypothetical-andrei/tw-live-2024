const express = require('express')
const bodyParser = require('body-parser')
const NodeCache = require('node-cache')
const pasteCache = new NodeCache({ stdTTL: 1800, checkperiod: 120 })

const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
	res.render('pages/index')
})

app.post('/pastes', (req, res) => {
	const pasteKey = uuidv4()
	console.warn(pasteKey)
	pasteCache.set(pasteKey, req.body.content)
	res.redirect(`pastes/${pasteKey}`)
})

app.get('/pastes/:key', (req, res) => {
	const key = req.params.key
	const paste = pasteCache.get(key)
	if (paste) {
		res.render('pages/paste', { paste, key })
	} else {
		res.status(404).render('pages/404')
	}
})

app.get('/pastes/raw/:key', (req, res) => {
	const key = req.params.key
	const paste = pasteCache.get(key)
	if (paste) {
		res.status(200).set('Content-Type', 'text/plain').send(paste)
	} else {
		res.status(404).render('pages/404')
	}
})

app.listen(8080)