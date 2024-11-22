import Sequelize from 'sequelize'
import createBookModel from './book.js'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sample.db',
  define: {
    timestamps: false
  }
})

const Book = createBookModel(sequelize, Sequelize)

try {
  await sequelize.sync({ force: true })
  console.log('created tables')
} catch (error) {
  console.warn(error)
}

