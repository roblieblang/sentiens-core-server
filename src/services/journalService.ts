/**
 * Journal Service
 *
 * Purpose: This module provides functions for managing journal entries in the application.
 *
 * Responsibilities:
 * - Creating and inserting new journal entries
 * - Retrieving a user's journal entries: deleted, extant, all
 * - Retrieving a user's specific journal entry
 * - Updating the content and update-timestamp of a journal entry
 * - Soft-deleting a journal entry
 *
 * Dependencies:
 * - Prisma
 *
 */

import { Prisma } from "@prisma/client";
import prisma from "../utils/prisma";

export const insertNewJournalEntry = async (
  userId: string,
  content: string
) => {
  return await prisma.journalEntry.create({
    data: {
      content,
      userId,
    },
  });
};

export const retrieveAllEntries = async (userId: string) => {
  return await prisma.journalEntry.findMany({ where: { userId } });
};

export const retrieveAllExtantEntries = async (userId: string) => {
  return await prisma.journalEntry.findMany({
    where: { userId, deletedAt: null },
  });
};

export const retrieveAllDeletedEntries = async (userId: string) => {
  return await prisma.journalEntry.findMany({
    where: { userId, NOT: { deletedAt: null } },
  });
};

export const retrieveSpecificEntry = async (
  userId: string,
  entryId: number
) => {
  return await prisma.journalEntry.findUnique({
    where: { userId, id: entryId },
  });
};

export const modifyEntry = async (
  userId: string,
  entryId: number,
  content: string
) => {
  return await prisma.journalEntry.update({
    where: { userId, id: entryId },
    data: { updatedAt: new Date(), content: content },
  });
};

export const softDeleteEntry = async (userId: string, entryId: number) => {
  return await prisma.journalEntry.update({
    where: { userId, id: entryId },
    data: { deletedAt: new Date() },
  });
};
