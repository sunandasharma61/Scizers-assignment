const userModel = require("../models/userModel");

const isEmpty = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  return true;
};
const createUser = async function (req, res) {
  try {
    let data = req.body;
    const name = data;
    if (!isEmpty(name)) {
      return res
        .status(400)
        .send({ status: "false", message: "Name must be present" });
    }

    const userCreated = await userModel.create(data);
    return res.status(201).send({ status: "true", data: userCreated });
  } catch (error) {
    return res.status(500).send({ status: "false", message: error.message });
  }
};

module.exports.createUser = createUser;
