const db = require('./index');
const Sequelize = require('sequelize');


const Admin = db.define('admin',{
	id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
	avt: { type: Sequelize.STRING},
	name: { type: Sequelize.STRING,notEmpty: true},
	username: {type:Sequelize.TEXT},
	email: { type:Sequelize.STRING, validate: {isEmail:true} },
	password : {type: Sequelize.STRING,allowNull: false },
})

module.exports = Admin;