import buildA from './a.js'
import buildB from './b.js'
import buildC from './c.js'

function buildAll(connection, DataTypes) {
    
    const A = buildA(connection, DataTypes)
    const B = buildB(connection, DataTypes)
    const C = buildC(connection, DataTypes)

    // define associations
    A.hasMany(B)
    B.hasMany(C)

    return {
        A,
        B,
        C
    }
}

export default buildAll
