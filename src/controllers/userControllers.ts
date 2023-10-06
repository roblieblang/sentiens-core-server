import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.create({
            data: req.body,
        });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(req.params.id).toString() },
        });
        if (!user) throw new Error('User not found');
        res.json(user);
    } catch (err) {
        res.status(404).json({ error: (err as Error).message });
    }
};

// Update a user by ID
export const updateUserById = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.update({
            where: { id: parseInt(req.params.id).toString() },
            data: req.body,
        });
        if (!user) throw new Error('User not found');
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
};

// Delete a user by ID
export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.delete({
            where: { id: parseInt(req.params.id).toString() },
        });
        if (!user) throw new Error('User not found');
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
};
