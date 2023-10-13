import { NextFunction, Request, Response } from "express";
import {
  insertNewUser,
  modifyUser,
  retrieveAllActiveUsers,
  retrieveAllInactiveUsers,
  retrieveAllUsers,
  retrieveUser,
  softDeleteUser,
} from "../services/user.service";

// Create a new user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await insertNewUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// Get all users
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status = req.query.status;

    let users;
    switch (status) {
      case "active":
        users = await retrieveAllActiveUsers();
        break;
      case "inactive":
        users = await retrieveAllInactiveUsers();
        break;
      default:
        users = await retrieveAllUsers();
    }
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Get a single user by ID
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await retrieveUser(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Update a user's profile by ID
export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Exclude isAdmin, email from request body
    const { isAdmin, email, id, createdAt, ...updateData } = req.body;

    const user = await modifyUser(req.params.userId, updateData);

    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Soft-delete a user by ID
export const softDeleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const softDeletedUser = await softDeleteUser(req.params.userId);

    if (!softDeletedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({ message: "User successfully soft-deleted" });
  } catch (err) {
    next(err);
  }
};
