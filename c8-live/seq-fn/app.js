import Sequelize from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'my.db'
})

const Kitten = sequelize.define('kitten', {
    name: Sequelize.STRING
  })
  
  await sequelize.sync({ force: true })
  
  const samples = [{
    name: 'alpha'
  }, {
    name: 'beta'
  }, {
    name: 'teta'
  }]
  
  await Kitten.bulkCreate(samples)

  const results = await Kitten.findAll({
    attributes: [
      [sequelize.fn('UPPER', sequelize.col('name')), 'upcase'],
    ],
    raw: true
  })

  console.warn(results)