const { Task, User, SharedTask } = require("../models");
const { Op } = require("sequelize");

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate,
      ownerId: req.userId,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar tarefa", error: err });
  }
};

exports.getTasks = async (req, res) => {
  const { status, dueDate } = req.query;

  try {
    const userId = req.userId;

    const where = {
      [Op.and]: [
        status ? { status } : {},
        dueDate ? { dueDate } : {},
        {
          [Op.or]: [
            { ownerId: userId },
            { '$sharedWith.id$': userId }
          ]
        }
      ]
    };

    const tasks = await Task.findAll({
      where,
      include: [
        {
          model: User,
          as: "sharedWith",
          attributes: ["id", "username"],
          through: { attributes: [] },
        },
        {
          model: User,
          as: "owner",
          attributes: ["id", "username"],
        },
      ],
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar tarefas", error: err });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, dueDate } = req.body;

  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: "Tarefa não encontrada" });

    if (task.ownerId !== req.userId)
      return res.status(403).json({ message: "Apenas o dono pode editar" });

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.dueDate = dueDate ?? task.dueDate;

    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar tarefa", error: err });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Tarefa não encontrada" });

    if (task.ownerId !== req.userId)
      return res.status(403).json({ message: "Apenas o dono pode excluir" });

    await task.destroy();
    res.json({ message: "Tarefa excluída com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao excluir tarefa", error: err });
  }
};

exports.shareTask = async (req, res) => {
  const { taskId, userIdToShare } = req.body;

  try {
    const task = await Task.findByPk(taskId);
    if (!task) return res.status(404).json({ message: "Tarefa não encontrada" });

    if (task.ownerId !== req.userId)
      return res.status(403).json({ message: "Apenas o dono pode compartilhar" });

    const userToShare = await User.findByPk(userIdToShare);
    if (!userToShare)
      return res.status(404).json({ message: "Usuário para compartilhar não encontrado" });

    await task.addSharedWith(userToShare);

    res.json({ message: "Tarefa compartilhada com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao compartilhar tarefa", error: err });
  }
};
