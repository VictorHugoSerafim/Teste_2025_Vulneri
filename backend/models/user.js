module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
  });

  User.associate = models => {
    User.hasMany(models.Task, { foreignKey: "ownerId" });
    User.belongsToMany(models.Task, {
      through: models.SharedTask,
      as: "sharedTasks",
      foreignKey: "userId"
    });
  };

  return User;
};
