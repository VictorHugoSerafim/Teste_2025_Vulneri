const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const auth = require("../middlewares/auth.middleware");

router.use(auth);

router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
router.post("/share", taskController.shareTask);

module.exports = router;
