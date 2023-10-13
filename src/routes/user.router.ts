import express from "express";
import {
  createUser,
  getUserById,
  getUsers,
  softDeleteUserById,
  updateUserById,
} from "../controllers/user.controller";
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

// Partially update a user's profile by ID
router.patch(
  "/:userId",
  userIdValidator,
  updateUserValidators,
  validateRequest,
  checkUserExistence,
  updateUserById
);

// Soft-delete a user by ID
router.patch(
  "/:userId/soft-delete",
  userIdValidator,
  validateRequest,
  checkUserExistence,
  softDeleteUserById
);

export default router;
