import { Sequelize } from 'sequelize'
import buildAll from './persistence/entities.js'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'my.db'
})

const models = buildAll(sequelize, Sequelize)

await sequelize.sync({ force: true })
const results = await models.A.findAll({
    include: {
        model: models.B,
        include: [models.C]
    }
})

console.log(JSON.stringify(results, null, 2))