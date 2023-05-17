const taskModel = require("../models/taskModel");

const createTask = async function (req, res) {
  try {
    let data=req.body
    let {taskName,dueDate}=data

  } catch (error) {
    return res.status(500).send({ status: "false", message: error.message });
  }
};

module.exports.createTask = {createTask,getTasks,getTaskByFilter,updateTask,deleteTask};
