const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.person = require('./person.js')(mongoose);
db.about = require('./about.js')(mongoose);

module.exports = db;