function buildB (connection, DataTypes) {
    return connection.define('B', {
        content: DataTypes.STRING
    })
}

export default buildB