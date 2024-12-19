export default (sequelize, DataTypes) => {
	return sequelize.define('chapter', {
		title: DataTypes.STRING,
		content: DataTypes.TEXT
	})
}