import Sequelize from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sample.db'
})

// define hooks
sequelize.addHook('beforeCreate', (instance, options) => {
    console.warn('beforeCreate defined on all models')
})

const Widget = sequelize.define('widget', {
    name: Sequelize.STRING,
    description: Sequelize.STRING
})

Widget.addHook('beforeCreate', (instance, options) => {
    console.warn('beforeCreate defined on Widget')
    if (instance.dataValues.name.toUpperCase() === 'FORBIDDEN') {
        throw new Error('Forbidden widget')
    }
    instance.dataValues.name = instance.dataValues.name.toUpperCase()
})

try {
    await sequelize.sync({ force: true })
    console.log('created tables')
    let widget = await Widget.create({ name: 'Widget 1', description: 'First widget' })
    console.log(widget.dataValues)
    widget = await Widget.create({ name: 'Forbidden', description: 'Forbidden widget' })
} catch (error) {
    console.warn(error)
}