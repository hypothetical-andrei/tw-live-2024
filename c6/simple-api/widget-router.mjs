import express from 'express'

const router = express.Router()

router.get('/widgets', (req, res) => {
    res.status(200).json(res.app.locals.widgets)
})

router.post('/widgets', (req, res) => {
    const widget = {}
    widget.description = req.body.description
    widget.id = res.app.locals.currentId
    res.app.locals.widgets.push(widget)
    res.app.locals.currentId++
    res.status(201).json(widget)
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

export default router