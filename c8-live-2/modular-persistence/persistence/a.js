function buildA (connection, DataTypes) {
    return connection.define('A', {
        content: DataTypes.STRING
    })
}

export default buildA