const db = require('./index');
const Sequelize = require('sequelize');
const Course = require("./course");
const User = require("./user");

const UserAssignCourse = db.define('userAssignCourse',{
    id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
    status: {type: Sequelize.ENUM('waiting','approve'),defaultValue:'waiting',allowNull: false }
})
UserAssignCourse.belongsTo(Course);
UserAssignCourse.belongsTo(User);

module.exports = UserAssignCourse;