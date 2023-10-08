import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prismaClientUtil";

export const checkUserExistence = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;

  // Check if user exists
  const userExists = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!userExists) {
    return res.status(404).json({ error: "User not found with provided ID" });
  }

  next();
};
