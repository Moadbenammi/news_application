const dbConfig = require("../config/dbConfig.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.news = require("./newsModel.js")(mongoose);

module.exports = db;