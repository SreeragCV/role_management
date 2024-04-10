const User = require("../model/user");
const jwtGenerator = require("../utils/jwtGenerator");
const bcrypt = require("bcrypt");

// LOGIN
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Cannot find the user" });
    }
    const validatePassword = bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    const token = jwtGenerator(user._id, user.role);

    res.setHeader("Authorization", `Bearer ${token}`);
    return res
      .status(200)
      .json({ message: "Successfully logged in", role: user.role });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// CREATE USER
module.exports.createUser = async (req, res) => {
  try {
    const { email, name, role, password } = req.body;
    console.log(email, name, role, password);
    if (!email || !name || !role || !password) {
      return res.status(401).json({ error: "fields must not be empty" });
    }
    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
      return res.status(402).json({ error: "Email aleardy exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, role, name, password: hashPassword });
    await newUser.save();
    return res.status(200).json({ message: "SUCCESS" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// DELETE USER
module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deleteUser = await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted" });
  } catch (e) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// USERS LIST
module.exports.usersList = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }).select(
      "-password"
    );
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// USER DETAILS
module.exports.userDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).select("-password");
    if (!user) {
      return res.status(400).json({ error: "no user found" });
    }
    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// EDIT USER
module.exports.editUser = async (req, res) => {
  const id = req.params.id;
  const { email, role, name } = req.body;
  if (!email || !name || !role) {
    return res.status(401).json({ error: "fields must not be empty" });
  }
  const editUser = await User.updateOne(
    { _id: id },
    { $set: { email, role, name } }
  );
  return res.status(200).json({ message: "User Updated!" });
};

// AUTH-CHECK
module.exports.isAuth = async (req, res) => {
  try {
    return res.json({
      status: true,
      role: req.role,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
