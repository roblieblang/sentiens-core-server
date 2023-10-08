import express from "express";
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../controllers/userControllers";
import { checkUserExistence, validateRequest } from "../middleware";
import {
  createUserValidators,
  updateUserValidators,
  userIdValidator,
} from "../validators";

const router = express.Router();

// Create a new user
router.post("/", createUserValidators, validateRequest, createUser);

// Get all users
router.get("/", getUsers);

// Get a user by ID
router.get(
  "/:userId",
  userIdValidator,
  validateRequest,
  checkUserExistence,
  getUserById
);

// Partially update a user by ID
router.patch(
  "/:userId",
  userIdValidator,
  updateUserValidators,
  validateRequest,
  checkUserExistence,
  updateUserById
);

// Delete a user by ID
router.delete(
  "/:userId",
  userIdValidator,
  validateRequest,
  checkUserExistence,
  deleteUserById
);

export default router;
