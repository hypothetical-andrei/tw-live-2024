import Sequelize from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sample.db'
})

const Author = sequelize.define('author', {
	name: Sequelize.STRING(10),
	email: Sequelize.STRING
})

try {
  await sequelize.sync({ force: true })
  console.log('created tables')
} catch (error) {
  console.warn(error)
}

