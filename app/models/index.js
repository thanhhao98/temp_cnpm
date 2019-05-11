const Sequelize = require('sequelize')
var config = require('../config/config').testDb
module.exports =  new Sequelize(config.database, config.username, config.password, config)