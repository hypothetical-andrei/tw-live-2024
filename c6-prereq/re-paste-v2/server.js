const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')
const compression = require('compression')
const Database = require('better-sqlite3')
// const ivm = require('isolated-vm')
// const isolate = new ivm.Isolate({ memoryLimit: 16 })


// const runPaste = async function (paste) {
//   const TIMEOUT = 10000
//   const context = isolate.createContextSync()
//   const jail = context.global
//   jail.setSync('global', jail.derefInto())
//   jail.setSync('__result__', '')

//   jail.setSync('log', function(...args) {
//     jail.setSync('__result__', jail.getSync('__result__') + args[0])
//     console.log(...args)
//   })

//   const hostile = isolate.compileScriptSync(`
//     ${paste.replaceAll('console.log', 'log')}
//     __result__ = __result__
//   `)
//   return hostile.run(context, { timeout: TIMEOUT})
// }

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

// app.get('/pastes/exec/:id', async (req, res) => {
//   try {
//     let key = req.params.id
//     const record = read.get({ id: key})
//     const paste = record?.content
//     try {
//       const output = await runPaste(paste)
//       if (paste) {
//         res.status(200).set('Content-Type', 'text/plain').send(output)
//       } else {
//         res.status(404).render('pages/404')
//       }
//     } catch (error) {
//       res.status(400).send(error.message)
//     }
//   } catch (error) {
//     res.status(500).set('Content-Type', 'text/plain').send('not working')
//   }
// })

app.listen(8080)


