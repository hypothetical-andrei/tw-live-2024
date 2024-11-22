import express from 'express'

const router = express.Router()

router.get('/widgets', (req, res) => {
    res.status(200).json(res.app.locals.widgets)
})

router.post('/widgets', (req, res) => {
    const candidateWidget = req.body
    candidateWidget.id = res.app.locals.currentId++
    res.app.locals.widgets.push(candidateWidget)
    res.status(201).json(candidateWidget)
})

router.get('/widgets/:id', (req, res) => {
    const widget = res.app.locals.widgets.find(e => e.id === parseInt(req.params.id))
    if (widget) {
        res.status(200).json(widget)
    } else {
        res.status(404).json({ message: 'try another widget' })
    }
})

router.put('/widgets/:id', (req, res) => {
    const widgetIndex = res.app.locals.widgets.findIndex(e => e.id === parseInt(req.params.id))
    if (widgetIndex !== -1) {
        res.app.locals.widgets[widgetIndex].description = req.body.description
        res.status(200).json({ message: 'modified' })
    } else {
        res.status(404).json({ message: 'try another widget' })
    }
})

router.delete('/widgets/:id', (req, res) => {
    const widgetIndex = res.app.locals.widgets.findIndex(e => e.id === parseInt(req.params.id))
    if (widgetIndex !== -1) {
        res.app.locals.widgets.splice(widgetIndex, 1)
        res.status(204).json({})
    } else {
        res.status(404).json({ message: 'try another widget' })
    }
})

// router.get('/widgets/:id/parts', (req, res) => {})
// router.post('/widgets/:id/parts', (req, res) => {})

// router.get('/widgets/:id/parts/:pid', (req, res) => {})
// router.put('/widgets/:id/parts/:pid', (req, res) => {})
// router.delete('/widgets/:id/parts/:pid', (req, res) => {})

export default router