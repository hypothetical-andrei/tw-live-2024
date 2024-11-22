import express from 'express'
import apiRouter from './api-router.mjs'

const app = express()
app.use(express.json())

app.locals.widgets = []
app.locals.currentId = 1

app.use('/api', apiRouter)

const firstMiddleware = (req, res, next) => {
    console.log('first middleware')
    next()
}

const secondMiddleware = (req, res, next) => {
    console.log('second middleware')
    next()
}

// get /error?trigger=on
app.get('/error', [firstMiddleware, secondMiddleware], (req, res, next) => {
    try {
        if (req.query.trigger === 'on') {
            throw new Error('error triggered')
        } else {
            res.status(200).json({ message: 'no error' })
        }
    } catch (error) {
        next(error)
    }
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: 'some server error' })
})

app.listen(8080)