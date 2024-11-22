import Sequelize from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sample.db'
})

try {
  await sequelize.authenticate()
} catch (error) {
  console.warn(error)
}