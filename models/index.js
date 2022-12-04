const dbConfig = require("../config/database");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user")(mongoose);
db.schedule = require("./schedule")(mongoose);
db.duration = require("./duration")(mongoose);
db.consultation = require("./consultation")(mongoose);

module.exports = db;