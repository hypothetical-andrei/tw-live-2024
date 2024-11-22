import Sequelize from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sample.db',
  define: {
    timestamps: false
  }
})

const Order = sequelize.define('order', {
  fulfilled: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  emmitted_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
})

const Client = sequelize.define('client', {
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 20]
    },
    set (value) {
      this.setDataValue('first_name', value.toLowerCase())
    }
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 20]
    },
    set (value) {
      this.setDataValue('last_name', value.toLowerCase())
    }
  }
}, {
  getterMethods: {
    fullName () {
      return this.firstname + ' ' + this.lastname
    }
  },
  setterMethods: {
    fullName (value) {
      const names = value.split(' ')
      this.setDataValue('firstname', names.slice(0, -1).join(' '))
      this.setDataValue('lastname', names.slice(-1).join(' '))
    }
  }
})

try {
  await sequelize.sync({ force: true })
  console.log('created tables')
} catch (error) {
  console.warn(error)
}

