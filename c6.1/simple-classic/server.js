import express from 'express'
import session from 'express-session'


const app = express()
app.set('view engine', 'ejs')

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

app.use(session({ secret: 'really secret secret' }))

app.get('/', (req, res, next) => {
    const session = req.session
    session.data = 'this is some session data'
    res.render('index', { title: 'welcome to express!', content: 'i am an express app' })
})

app.get('/next',  (req, res, next) => {
    const session = req.session
    const data = session.data
    res.render('next', { data })
})

app.listen(8080)