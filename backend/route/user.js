const express = require("express");
const router = express.Router();
const {
  createUser,
  login,
  getUsers,
  isAuth,
  deleteUser,
  userDetails,
  editUser,
} = require("../controller/user.js");
const { verifyToken, isAdmin } = require("../middleware/authorization.js");

router.post("/login", login);
router.post("/create-user", verifyToken, isAdmin, createUser);
router.get("/users", verifyToken, isAdmin, getUsers);
router.get("/is-auth", verifyToken, isAuth);
router.delete("/users/:id", verifyToken, isAdmin, deleteUser);
router.get("/users/:id", verifyToken, isAdmin, userDetails);
router.patch("/users/:id/edit", verifyToken, isAdmin, editUser);

module.exports = router;
