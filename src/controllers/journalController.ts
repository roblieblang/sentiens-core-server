import { NextFunction, Request, Response } from "express";
import {
  insertNewJournalEntry,
  modifyEntry,
  retrieveAllDeletedEntries,
  retrieveAllEntries,
  retrieveAllExtantEntries,
  retrieveSpecificEntry,
  softDeleteEntry,
} from "../services/journalService";
import prisma from "../utils/prisma";

// Create a new journal entry
export const createJournalEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content } = req.body;
    const journalEntry = await insertNewJournalEntry(
      req.params.userId,
      content
    );

    res.status(201).json(journalEntry);
  } catch (err) {
    next(err);
  }
};

// Get all of a user's journal entries
export const getJournalEntries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const status = req.query.status;

    let entries;
    switch (status) {
      case "deleted":
        entries = await retrieveAllDeletedEntries(userId);
        break;
      case "all":
        entries = await retrieveAllEntries(userId);
        break;
      case "extant":
      default:
        entries = await retrieveAllExtantEntries(userId);
        break;
    }

    res.status(200).json(entries);
  } catch (err) {
    next(err);
  }
};

// Get a user's specific journal entry
export const getJournalEntryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const entryId = parseInt(req.params.entryId);

    const journalEntry = await retrieveSpecificEntry(userId, entryId);
    if (!journalEntry) {
      return res.status(404).json({ error: "Journal Entry not found." });
    }
    res.status(200).json(journalEntry);
  } catch (err) {
    next(err);
  }
};

// Update a journal entry
export const updateJournalEntryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content, updatedAt } = req.body;
    const userId = req.params.userId;
    const entryId = parseInt(req.params.entryId);

    const JournalEntry = await modifyEntry(userId, entryId, content);

    res.json(JournalEntry);
  } catch (err) {
    next(err);
  }
};

// Soft-delete a journal entry
export const softDeleteJournalEntryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const entryId = parseInt(req.params.entryId);

    const softDeletedJournalEntry = await softDeleteEntry(userId, entryId);

    if (!softDeletedJournalEntry) {
      return res
        .status(404)
        .json({ error: "User or journal entry not found." });
    }
    res
      .status(200)
      .json({ message: "Journal Entry soft-deleted successfully" });
  } catch (err) {
    next(err);
  }
};
