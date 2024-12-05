function buildC (connection, DataTypes) {
    return connection.define('C', {
        content: DataTypes.STRING
    })
}

export default buildC