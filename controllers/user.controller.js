const User = require("../models/user.model");

const register = async (req, res) => {
  try {
    var { username, password, workingAt, firstname, lastname } = req.body;
    username = username.trim();
    password = password.trim();
    workingAt = workingAt.trim().toLowerCase();
    firstname = firstname.trim().toLowerCase();
    lastname = lastname.trim().toLowerCase();

    const user = await User.create({
      username,
      password,
      workingAt,
      firstname,
      lastname,
    });
    res.status(201).json("User created successfully.");
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "User already exists." });
    }
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    var { username, password } = req.body;
    username = username.trim();
    password = password.trim();

    const user = await User.findOne({
      username: username,
      password: password,
    });

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    var { username, workingAt } = req.body;
    username = username.trim();
    workingAt = workingAt.trim();

    const user = await User.findOneAndDelete({
      username: username,
      workingAt: workingAt,
    });

    if (user) {
      res.status(200).json({ message: "User deleted successfully." });
    }

    res.status(400).json({ message: "User not found." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, deleteUser };
