const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, Sequelize.DataTypes);
db.Task = require("./task")(sequelize, Sequelize.DataTypes);
db.SharedTask = require("./sharedTask")(sequelize, Sequelize.DataTypes);

Object.values(db).forEach((model) => {
  if (model.associate) model.associate(db);
});

module.exports = db;
