const Sequelize = require('sequelize')
var config = require('../config/config').herokuDb
module.exports = new Sequelize(config.url,config.config)
