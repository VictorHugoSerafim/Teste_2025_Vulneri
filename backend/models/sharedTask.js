module.exports = (sequelize, DataTypes) => {
  const SharedTask = sequelize.define("SharedTask", {}, { timestamps: false });
  return SharedTask;
};
