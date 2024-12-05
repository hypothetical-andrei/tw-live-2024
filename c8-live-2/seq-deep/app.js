import Sequelize from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
})

const A = sequelize.define('A', {
    content: Sequelize.STRING
})

const B = sequelize.define('B', {  
    content: Sequelize.STRING
})

A.hasMany(B)

const C = sequelize.define('C', {
    content: Sequelize.STRING
})

B.hasMany(C)

await sequelize.sync()
for (let i = 0; i < 3; i++) {
    const a = await A.create({ content: `A${i}` })
    for (let j = 0; j < 3; j++) {
        const b = await B.create({ content: `B${i}-${j}` })
        await a.addB(b)
        for (let k = 0; k < 3; k++) {
            const c = await C.create({ content: `C${i}-${j}-${k}` })
            await b.addC(c)
        }
    }
}


const result = await A.findAll({
    include: [
        { model: B, include: [C] }
    ]
})

console.log(JSON.stringify(result, null, 2))