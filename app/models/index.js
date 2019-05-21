const Sequelize = require('sequelize')
var config = require('../config').herokuDb
module.exports =  new Sequelize(config.database, config.username, config.password, config)