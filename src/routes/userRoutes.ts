import express from "express";
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../controllers/userControllers";

const router = express.Router();

// Create a new user
router.post("/", createUser);

// Get all users
router.get("/", getUsers);

// Get a user by ID
router.get("/:id", getUserById);

// Update a user by ID
router.put("/:id", updateUserById);

// Delete a user by ID
router.delete("/:id", deleteUserById);

export default router;
