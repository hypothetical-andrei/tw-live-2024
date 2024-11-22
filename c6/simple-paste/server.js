const express = require('express')
const Database = require('better-sqlite3')
const { v4: uuidv4 } = require('uuid')

const db = new Database('code.db', { verbose: console.log })

const app = express()
app.use(express.urlencoded({ extended: true }))

db.prepare(`create table if not exists snippets (
  id string primary key,
  content text
)`).run()

const insert = db.prepare('insert into snippets (id, content) values (@id, @content)')

const read = db.prepare('select * from snippets where id=@id')

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
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
        res.render('paste', { paste, key })
    } else {
        res.status(404).render('404')
    }
})

app.listen(8080)
