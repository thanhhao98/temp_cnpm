module.exports = function(sequelize, Sequelize) {

	var User = sequelize.define('user', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		name: { type: Sequelize.STRING,notEmpty: true},
		username: {type:Sequelize.TEXT},
		email: { type:Sequelize.STRING, validate: {isEmail:true} },
		password : {type: Sequelize.STRING,allowNull: false },
		last_login: {type: Sequelize.DATE},
		status: {type: Sequelize.ENUM('active','inactive'),defaultValue:'active',allowNull: false },
		isAdmin: {type: Sequelize.ENUM('true','false'),defaultValue:'false',allowNull: false }
});
	return User;
}