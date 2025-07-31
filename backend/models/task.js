module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM("pendente", "em andamento", "concluída"),
      defaultValue: "pendente",
    },
    dueDate: DataTypes.DATEONLY
  });

  Task.associate = models => {
    Task.belongsTo(models.User, { as: "owner", foreignKey: "ownerId" });
    Task.belongsToMany(models.User, {
      through: models.SharedTask,
      as: "sharedWith",
      foreignKey: "taskId"
    });
  };

  return Task;
};
