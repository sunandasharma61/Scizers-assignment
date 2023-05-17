const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const taskController = require("../controllers/taskController");

router.post("/user", userController.createUser);

router.post("/task", taskController.createTask);
router.get("/tasks", taskController.getTask);
router.delete("/tasks/:taskId", taskController.deleteTask)




module.exports=router;