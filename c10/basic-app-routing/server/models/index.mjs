import createBook from './book.mjs'
import createChapter from './chapter.mjs'
import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sample.db'
})
const Book = createBook(sequelize, DataTypes)
const Chapter = createChapter(sequelize, DataTypes)

Book.hasMany(Chapter)

try {
	sequelize.sync({ alter: true })
} catch (err) {
  console.warn(err)
}  

export default { 
    Book, 
    Chapter 
}