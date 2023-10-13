/**
 * User Service
 *
 * Purpose: This module provides functions for managing users in the application.
 *
 * Responsibilities:
 * - Creating and inserting new users into the database
 * - Retrieving all users, all active users, all inactive (soft-deleted) users
 * - Retrieving a single user by its ID
 * - Modifying user data
 * - Anonymizing user details
 * - Soft-deleting and restoring users
 * - Permanently deleting users
 *
 * Dependencies:
 * - Prisma
 *
 */

import { Prisma } from "@prisma/client";
import prisma from "../utils/prisma";

type ModifyUserInput = {
  name?: string;
  password?: string;
  themePreference?: string;
  lastLogin?: Date;
};

export const insertNewUser = async (user: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: user,
  });
};

export const retrieveAllUsers = async () => {
  return await prisma.user.findMany();
};

export const retrieveAllInactiveUsers = async () => {
  return await prisma.user.findMany({
    where: {
      NOT: { deletedAt: null },
    },
  });
};

export const retrieveAllActiveUsers = async () => {
  return await prisma.user.findMany({
    where: { deletedAt: null },
  });
};

export const retrieveUser = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};

export const modifyUser = async (
  userId: string,
  updateData: ModifyUserInput
) => {
  return await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });
};

export const anonymizeUser = async (userId: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      name: "Anonymous User",
      email: `anonymous${userId}@example.com`,
    },
  });
};

export const restoreUser = async (userId: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      deletedAt: null,
    },
  });
};

export const softDeleteUser = async (userId: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      deletedAt: new Date(),
    },
  });
};

export const permanentlyDeleteUser = async (userId: string) => {
  return await prisma.user.delete({
    where: { id: userId },
  });
};
