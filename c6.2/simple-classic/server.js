import express from 'express'
import session from 'express-session'

const app = express()
app.set('view engine', 'ejs')

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

app.use(session({ secret: 'really secret secret' }))

app.get('/', (req, res) => {
    const session = req.session
    session.sessionData = 'i am some session data'
    res.render('index', { title: 'a simple app', content: 'i am a classical app' })
})

app.get('/next', (req, res) => {
    const session = req.session
    const sessionData = session.sessionData
    res.render('next', { sessionData })
})

app.listen(8080)