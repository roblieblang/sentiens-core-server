import express from "express";
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../controllers/userControllers";
import {
  createUserValidations,
  idValidation,
  updateUserValidations,
} from "../validators/userValidators";

const router = express.Router();

// Create a new user
router.post("/", createUserValidations, createUser);

// Get all users
router.get("/", getUsers);

// Get a user by ID
router.get("/:id", idValidation, getUserById);

// Partially update a user by ID
router.patch("/:id", idValidation, updateUserValidations, updateUserById);

// Delete a user by ID
router.delete("/:id", idValidation, deleteUserById);

export default router;
