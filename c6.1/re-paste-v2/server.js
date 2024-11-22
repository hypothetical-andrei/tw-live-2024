const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')
const compression = require('compression')
const Database = require('better-sqlite3')

const db = new Database('code.db', { verbose: console.log })

const app = express()

db.prepare(`create table if not exists snippets (
  id string primary key autoincrement,
  content text
)`).run()

const insert = db.prepare('insert into snippets (id, content) values (@id, @content)')

const read = db.prepare('select * from snippets where id=@id')

app.set('view engine', 'ejs')
app.use(compression())

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('pages/index')
})

app.post('/pastes', (req, res) => {
  const key = uuidv4()
  insert.run({ id: key, content: req.body.content })
  res.redirect(`pastes/${key}`)
})

app.get('/pastes/:id', (req, res) => {
  let key = req.params.id
  const record = read.get({ id: key})
  const paste = record?.content
  if (paste) {
    res.render('pages/paste', { paste, key })
  } else {
    res.status(404).render('pages/404')
  }
})

app.get('/pastes/raw/:id', (req, res) => {
  let key = req.params.id
  const record = read.get({ id: key})
  const paste = record?.content
  if (paste) {
    res.status(200).set('Content-Type', 'text/plain').send(paste)
  } else {
    res.status(404).render('pages/404')
  }
})

app.listen(8080)


