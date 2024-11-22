const express = require('express')

const router = express.Router()

// get /widgets?simplified=1
router.get('/widgets', (req, res) => {
	if (parseInt(req.query.simplified) === 1) {
		res.status(200).json(res.app.locals.widgets.map(e => e.description))
	} else {
		res.status(200).json(res.app.locals.widgets)
	}
})

router.post('/widgets', (req, res) => {
	const widget = req.body
	res.app.locals.widgets.push(widget)
	res.status(201).json({ message: 'created' })
})

router.get('/widgets/:id', (req, res) => {
	const id = parseInt(req.params.id)
	const widget = res.app.locals.widgets.find(e => e.id === id)
	if (widget) {
		res.status(200).json(widget)
	} else {
		res.status(404).json({ message: 'not found' })
	}
})

router.put('/widgets/:id', (req, res) => {
	const id = parseInt(req.params.id)
	const widgetIndex = res.app.locals.widgets.findIndex(e => e.id === id)
	if (widgetIndex !== -1) {
		res.app.locals.widgets[widgetIndex].description = req.body.description
		res.status(202).json({ message: 'accepted' })
	} else {
		res.status(404).json({ message: 'not found' })
	}
})

router.delete('/widgets/:id', (req, res) => {
	const id = parseInt(req.params.id)
	const widgetIndex = res.app.locals.widgets.findIndex(e => e.id === id)
	if (widgetIndex !== -1) {
		res.app.locals.widgets.splice(widgetIndex, 1)
		res.status(204).json({ message: 'accepted' })
	} else {
		res.status(404).json({ message: 'not found' })
	}
})

module.exports = router