import express from 'express'
import apiRouter from './api-router.mjs'

const app = express()
app.use(express.json())

app.locals.widgets = []
app.locals.currentId = 1

const middleware1 = (req, res, next) => {
    console.log('middleware 1')
    next()
}

const middleware2 = (req, res, next) => {
    console.log('middleware 2')
    next()
}

app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'pong!' })
})

app.use('/api', apiRouter)

// get /error?trigger=on
app.get('/error', [middleware1, middleware2], (req, res, next) => {
    try {
        if (req.query.trigger === 'on') {
            throw new Error('some error')
        } else {
            res.status(200).send('no error')
        }
    } catch (error) {
        next(error)
    }
})

app.use((error, req, res, next) => {
    console.warn(error)
    res.status(500).json({ message: 'some error' })
})

app.listen(8080)