const dbConfig = require('../config/db.config')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.menus = require('./menu.model')(mongoose)
db.dbSchema = require('./model')(mongoose)

module.exports = db