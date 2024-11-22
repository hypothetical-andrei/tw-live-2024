import express from 'express'
import session from 'express-session'

const app = express()
app.set('view engine', 'ejs')

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

app.use(session({ secret: 'really secret secret' }))

app.get('/ping', (req, res) => {
    res.status(200).send('ok')
})

app.get('/', (req, res) => {
    const session = req.session
    session.someKey = 'this is some session data'
    res.render('index', { title: 'i am a title', message: 'i am a message' })
})

app.get('/next', (req, res) => {
    const session = req.session
    const data = session.someKey
    res.render('next', { data })
})

app.listen(8080)