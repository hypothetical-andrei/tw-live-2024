import express from 'express'
import router from './widget-router.mjs'

const app = express()
app.use(express.json())

app.locals.widgets = [{
	id: 1,
	description: 'some description'
}, {
	id: 2,
	description: 'some other description'
}]
app.locals.currentId = 3

app.use('/api', router)

// get /error?trigger=on
app.get('/error', (req, res, next) => {
	try {
		if (req.query.trigger === 'on') {
			throw new Error('some error')
		} else {
			res.status(200).send('no error')
		}
	} catch (err) {
		next(err)
	}
})

app.use((err, req, res, next) => {
	console.warn(err)
	res.status(500).json({ message: 'some server error' })	
})

app.listen(8080)