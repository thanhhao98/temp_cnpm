const db = require('./index')
const Sequelize = require('sequelize')
const Course = require("./course")

const Document = db.define('document',{
    id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
    path: { type: Sequelize.STRING,notEmpty: true},
    title: { type: Sequelize.STRING,notEmpty: true},
    description: { type: Sequelize.STRING},
})
Document.belongsTo(Course)

module.exports = Document