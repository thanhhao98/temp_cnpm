const db = require('./index')
const Sequelize = require('sequelize')
const Admin = require("./admin")

const Forum = db.define('forum',{
    id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
    adminId: { type: Sequelize.INTEGER},
    name: { type: Sequelize.STRING,notEmpty: true},
    description: { type: Sequelize.STRING ,notEmpty: true},
})
Forum.belongsTo(Admin)
module.exports = Forum