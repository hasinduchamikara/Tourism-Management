import express from "express";
import User from "../models/userModel.js";
import {
  allUser,
  oneUser,
  createUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  getMe,
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

// Getting all
router.get("/", allUser);

// Getting One
router.get("/:id", getUser, oneUser);

// Creating one
router.post("/", createUser);

// Updating One
router.patch("/:id", getUser, updateUser);

// Deleting One
router.delete("/:id", getUser, deleteUser);

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

export default router;
