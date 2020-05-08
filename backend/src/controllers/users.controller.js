const usersCtrs = {};

const UserModel = require("../models/User");

usersCtrs.getUsers = async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
};

usersCtrs.createUser = async (req, res) => {
  const { username } = req.body;
  const newUser = new UserModel({
    username,
  });
  await newUser.save();
  res.json({ newUser, message: "User created" });
};

usersCtrs.deleteUser = async (req, res) => {
  const id = req.params.id;
  await UserModel.findByIdAndDelete(id);
  res.json({ message: "User deleted" });
};

module.exports = usersCtrs;
