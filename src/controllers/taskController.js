const taskModel = require("../models/taskModel");
const { isValidObjectId } = require("mongoose");

//============= Create Task ==============
const createTask = async function (req, res) {
  try {
    let task = req.body;
    let { taskName, dueDate, userId } = task;
    if (!taskName) {
      return res
        .status(400)
        .send({ status: false, message: "Task name is mandatory" });
    }

    if (!dueDate) {
      return res
        .status(400)
        .send({ status: false, message: "Due date is mandatory" });
    }

    if (!userId) {
      return res
        .status(400)
        .send({ status: false, message: "User ID is mandatory" });
    }

    if (!isValidObjectId(userId)) {
      return res
        .status(400)
        .send({ status: false, message: "User ID is not valid " });
    }
    const taskData = await taskModel.create(task);
    return res.status(201).send({ status: true, data: taskData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//============= Get Task ==============
const getTask = async function (req, res) {
  try {
    const { taskName, dueDate, status } = req.query;
    const query = {};
    if (taskName) {
      query.taskName = taskName;
    }
    if (dueDate) {
      query.dueDate = dueDate;
    }
    if (status) {
      query.status = status;
    }

    const saveData = await taskModel.find(query);
    if (saveData.length == 0) {
      return res
        .status(404)
        .send({ status: false, msg: "Task is not available" });
    } else {
      return res.status(200).send({ status: true, data: saveData });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: "error message" });
  }
};

//============= Delete Task ==============
const deleteTask = async function (req, res) {
  try {
    const taskId = req.params.taskId;
    if (!isValidObjectId(taskId)) {
      return res
        .status(404)
        .send({ status: false, message: "Task id is not valid" });
    }
    const checkTaskId = await taskModel.findById(taskId);
    if (!checkTaskId || checkTaskId.isDeleted == true) {
      return res
        .status(404)
        .send({ status: false, message: "Task already deleted" });
    }
    const deleteTask = await taskModel.findOneAndUpdate(
      { _id: taskId },
      { $set: { isDeleted: true } }
    );
    return res
      .status(200)
      .send({ staus: true, message: "Sucessfully Deleted " });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
module.exports = { createTask, getTask, deleteTask };
