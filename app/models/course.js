const db = require('./index')
const Sequelize = require('sequelize')
const Admin = require("./admin")

const Course = db.define('course',{
    id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
    adminId: { type: Sequelize.INTEGER},
	avt: { type: Sequelize.STRING},
    name: { type: Sequelize.STRING,notEmpty: true},
    image: { type: Sequelize.STRING,notEmpty: true},
    title: { type: Sequelize.STRING,notEmpty: true},
    description: { type: Sequelize.STRING ,notEmpty: true},
	category: {type: Sequelize.ENUM('Development', 'Design', 'Bussiness', 'IT & Software', 'Personal Development', 'Marketing', 'Photography', 'Music'),defaultValue:'Development',allowNull: false },
})
Course.belongsTo(Admin)
module.exports = Course