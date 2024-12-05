import 'dotenv/config'
import express from 'express'
import Sequelize from 'sequelize'

let sequelize

if (process.env.NODE_ENV === 'development') {
  console.log('we are in dev mode')
  sequelize = new Sequelize({
  	dialect: 'sqlite',
  	storage: 'dev.db'
  })  
} else {
  sequelize = new Sequelize('webstuff3', 'app4', 'welcome123', {
    dialect: 'mysql',  
    define: {
      timestamps: false
    }
  })
}

class HttpError extends Error {
  constructor (message, code, entity) {
    super(message)
    this.code = code
    this.entity = entity
  }
}

const Book = sequelize.define('book', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 100]
    }
  },
  content: Sequelize.TEXT
})

const Chapter = sequelize.define('chapter', {
  title: Sequelize.STRING,
  content: Sequelize.TEXT
})

Book.hasMany(Chapter)

const app = express()
app.use(express.static('public'))
app.use(express.json())

await sequelize.sync({ alter: true})

app.get('/books', async (req, res, next) => {
  try {
    const books = await Book.findAll()
    res.status(200).json(books)
  } catch (err) {
    next(new HttpError(err, 500)) 
  }
})

app.post('/books', async (req, res, next) => {
  try {
    if (req.query.bulk && req.query.bulk === 'on') {
      await Book.bulkCreate(req.body)
      res.status(201).json({ message: 'created' })
    } else {
      await Book.create(req.body)
      res.status(201).json({ message: 'created' })
    }
  } catch (err) {
    next(new HttpError(err.message, 500)) 
  }
})

app.get('/books/:id', async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id)
    if (book) {
      res.status(200).json(book)
    } else {
      next(new HttpError('not found', 404, 'book')) 
    }
  } catch (err) {
    next(new HttpError(err.message, 500)) 
  }
})

app.put('/books/:id', async (req, res, next) => {
  try {
    const result = await Book.update(req.body, {
      where: {
        id: req.params.id
      }, 
      fields: ['title', 'content'] 
    })
    if (result.shift() !== 0) {
      res.status(202).json({ message: 'accepted' })
    } else {
      next(new HttpError('not found', 404, 'book')) 
    }
  } catch (err) {
    next(new HttpError(err.message, 500)) 
  }
})

app.delete('/books/:id', async (req, res, next) => {
  try {
    const result = await Book.destroy({
      where: {
        id: req.params.id
      }
    })
    if (result !== 0) {
      res.status(204).json({ message: 'accepted' })
    } else {
      next(new HttpError('not found', 404, 'book')) 
    }
  } catch (err) {
    next(new HttpError(err.message, 500)) 
  }
})

app.get('/books/:bid/chapters', async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.bid, { include: [Chapter] })
    if (book) {
      res.status(200).json(book.chapters)
    } else {
      next(new HttpError('not found', 404, 'book')) 
    }
  } catch (err) {
    next(new HttpError(err.message, 500)) 
  }
})

app.get('/books/:bid/chapters/:cid', async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.bid, { include: [{
      model: Chapter,
      where: {
        id: req.params.cid
      }
    }] })
    if (book && book.chapters.length !== 0) {
      res.status(200).json(book.chapters.shift())
    } else {
      next(new HttpError('not found', 404, 'book or chapter')) 
    }
  } catch (err) {
    next(new HttpError(err.message, 500)) 
  }
})

app.post('/books/:bid/chapters', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.bid)
    if (book) {
      const chapter = req.body
      chapter.bookId = book.id
      await Chapter.create(chapter)
      res.status(201).json({ message: 'created' })
    } else {
      next(new HttpError('not found', 404, 'book')) 
    }
  } catch (err) {
    next(new HttpError(err.message, 500)) 
  }
})

app.put('/books/:bid/chapters/:cid', async (req, res) => {
  try {
    const result = await Chapter.update(req.body,  {
      fields: ['title', 'content'],
      where: {
        bookId: req.params.bid,
        id: req.params.cid
      }
    })
    if (result.shift() !== 0) {
        res.status(202).json({ message: 'accepted' })
    } else {
      next(new HttpError('not found', 404, 'chapter or book')) 
    }
  } catch (err) {
    next(new HttpError(err.message, 500)) 
  }
})

app.delete('/books/:bid/chapters/:cid', async (req, res) => {
  try {
    const result = await Chapter.destroy({
      fields: ['title', 'content'],
      where: {
        bookId: req.params.bid,
        id: req.params.cid
      }
    })
    if (result.shift() !== 0) {
        res.status(204).json({ message: 'accepted' })
    } else {
      next(new HttpError('not found', 404, 'chapter or book')) 
    }
  } catch (err) {
    next(new HttpError(err.message, 500)) 
  }
})

const error404Handler = (err, req, res, next) => {
  if (err.code === 404) {
    res.status(404).json({ message: `${err.entity} not found` })
  } else {
    next(err)
  }
}

const error500Handler = (err, req, res, next) => {
  console.warn(err)
  res.status(500).json({ message: 'server error'})
}

app.use(error404Handler)
app.use(error500Handler)

app.listen(process.env.PORT || 8080, async () => {
  await sequelize.sync({ alter: true })
})