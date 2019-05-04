const db = require('./index');
const Sequelize = require('sequelize');
const Course = require("./course");
const User = require("./user");

const Video = db.define('video',{
    id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
    path: { type: Sequelize.STRING,notEmpty: true},
    title: { type: Sequelize.STRING,notEmpty: true},
    description: { type: Sequelize.STRING},
})
Video.belongsTo(Course);

module.exports = Video;