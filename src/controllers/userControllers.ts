import { Request, Response } from "express";
import prisma from "../utils/prismaClientUtil";

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.create({
      data: req.body,
    });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: (err as Error).message });
  }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: (err as Error).message });
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.userId },
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: (err as Error).message });
  }
};

// Update a user by ID
export const updateUserById = async (req: Request, res: Response) => {
  try {
    // Exclude isAdmin, email from request body
    const { isAdmin, email, ...updateData } = req.body;

    const user = await prisma.user.update({
      where: { id: req.params.userId },
      data: updateData,
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: (err as Error).message });
  }
};

// Delete a user by ID
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.delete({
      where: { id: req.params.userId },
    });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: (err as Error).message });
  }
};
