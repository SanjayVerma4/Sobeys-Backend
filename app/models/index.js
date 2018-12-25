const Sequelize = require('sequelize');
const config = require('../config').database;
const fs = require("fs");
const path = require("path");

var sequelize = new Sequelize(
    config.name,
    config.username,
    config.password,
    config.options
)
var db = {}
fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
        //db[model.name].sync({ force: false });
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});
sequelize.authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully to AMP Database.');
    })
    .catch(function(err) {
        console.log('Unable to connect to AMP Database:', err);
    });
db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;