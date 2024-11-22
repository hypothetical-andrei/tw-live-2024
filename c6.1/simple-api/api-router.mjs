import express from 'express'

const router = express.Router()

router.get('/widgets', (req, res, next) => {
    res.status(200).json(res.app.locals.widgets)
})

router.post('/widgets', (req, res, next) => {
    const candidateWidget = req.body
    candidateWidget.id = res.app.locals.currentId++
    res.app.locals.widgets.push(candidateWidget)
    res.status(201).json(candidateWidget)
})

router.get('/widgets/:id', (req, res, next) => {
    const widget = res.app.locals.widgets.find(e => e.id === parseInt(req.params.id))
    if (widget) {
        res.status(200).json(widget)
    } else {
        res.status(404).json({ message: 'not found' })
    }
})

router.put('/widgets/:id', (req, res, next) => {
    const widgetIndex = res.app.locals.widgets.findIndex(e => e.id === parseInt(req.params.id))
    if (widgetIndex !== -1) {
        res.app.locals.widgets[widgetIndex].description = req.body.description
        res.status(202).json({ message: 'accepted' })
    } else {
        res.status(404).json({ message: 'not found' })
    }
})

router.delete('/widgets/:id', (req, res, next) => {
    const widgetIndex = res.app.locals.widgets.findIndex(e => e.id === parseInt(req.params.id))
    if (widgetIndex !== -1) {
        res.app.locals.widgets.splice(widgetIndex, 1)
        res.status(204).send()
    } else {
        res.status(404).json({ message: 'not found' })
    }
})

// router.get('/widgets/:id/parts', (req, res, next) => {})
// router.post('/widgets/:id/parts', (req, res, next) => {})

// router.get('/widgets/:id/parts/:pid', (req, res, next) => {})
// router.put('/widgets/:id/parts/:pid', (req, res, next) => {})
// router.delete('/widgets/:id/parts/:pid', (req, res, next) => {})


export default router