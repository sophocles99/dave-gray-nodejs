const User = require("../model/User");
const { isValidObjectId } = require("mongoose");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID required" });
  if (!isValidObjectId(req.body.id))
    return res.status(400).json({ message: "invalid id" });
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(404)
      .json({ message: `User ID ${req.body.id} not found` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  if (!isValidObjectId(req.params.id))
    return res.status(400).json({ message: "invalid id" });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(404)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  res.json(user);
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
};
