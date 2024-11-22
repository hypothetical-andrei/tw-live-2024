const express = require('express')
const session = require('express-session')

const app = express()
app.set('view engine', 'pug')

app.use((req, res, next) => {
	console.log(req.url)
	next()
})

app.use(session({secret : 'really secret secret'}))

app.get('/', (req, res) => {
	const session = req.session
	session.someData = 'this is some session data'
	res.render('index', { title: 'some title', message: 'some message' })
})

app.get('/next', (req, res) => {
	const session = req.session
	const data = session.someData
	res.render('next', { data })
})

app.listen(8080)