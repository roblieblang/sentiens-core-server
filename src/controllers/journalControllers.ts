import { JournalEntry } from "@prisma/client";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../utils/prismaClientUtil";

// Create a new journal entry
export const createJournalEntry = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const journalEntry = await prisma.journalEntry.create({
      data: req.body,
    });

    res.status(201).json(journalEntry);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while trying to create a new journal entry.",
    });
  }
};

// Get all of a user's journal entries
export const getJournalEntries = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const journalEntries = await prisma.journalEntry.findMany({
      where: { userId: userId },
    });

    res.json(journalEntries);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching journal entries." });
  }
};

// Get a specific journal entry
export const getJournalEntryById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const JournalEntry = await prisma.journalEntry.findUnique({
      where: { userId: userId, id: parseInt(req.params.entryId) },
    });

    res.json(JournalEntry);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while trying to fetch a journal entry.",
    });
  }
};

// Update a journal entry
export const updateJournalEntryById = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const userId = req.params.userId;

    const JournalEntry = await prisma.journalEntry.update({
      where: { userId: userId, id: parseInt(req.params.entryId) },
      data: { content: content },
    });

    res.json(JournalEntry);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while trying to update a journal entry.",
    });
  }
};

// Delete a journal entry
export const deleteJournalEntryById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const JournalEntry = await prisma.journalEntry.delete({
      where: { userId: userId, id: parseInt(req.params.entryId) },
    });

    res.json({ message: "Journal Entry deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while trying to delete a journal entry.",
    });
  }
};
